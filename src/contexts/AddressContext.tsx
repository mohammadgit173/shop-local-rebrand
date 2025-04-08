import React, { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "./UserContext";

export interface Address {
  id: string;
  user_id: string;
  label: string;
  full_address: string;
  city: string;
  notes?: string;
  is_default: boolean;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface AddressContextType {
  addresses: Address[];
  selectedAddress: Address | null;
  isLoading: boolean;
  isInDeliveryRadius: boolean | null;
  addAddress: (address: Omit<Address, "id" | "user_id" | "is_default">) => Promise<void>;
  deleteAddress: (id: string) => Promise<void>;
  updateAddress: (address: Address) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;
  selectAddress: (address: Address | null) => void;
  checkDeliveryRadius: (latitude: number, longitude: number) => Promise<boolean>;
  getCurrentLocation: () => Promise<GeolocationPosition | null>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

// Default center of delivery area (will be fetched from database in production)
const DEFAULT_DELIVERY_CENTER = {
  latitude: 33.8938,
  longitude: 35.5018
};

// Default delivery radius in kilometers
const DEFAULT_DELIVERY_RADIUS = 15;

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInDeliveryRadius, setIsInDeliveryRadius] = useState<boolean | null>(null);
  const [deliveryCenter, setDeliveryCenter] = useState(DEFAULT_DELIVERY_CENTER);
  const [deliveryRadius, setDeliveryRadius] = useState(DEFAULT_DELIVERY_RADIUS);

  // Calculate distance between two coordinates in kilometers using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
  };

  // Check if coordinates are within delivery radius
  const checkDeliveryRadius = async (latitude: number, longitude: number): Promise<boolean> => {
    try {
      // In production, fetch delivery center and radius from database
      // const { data } = await supabase.from('store_config').select('*').single();
      // if (data) {
      //   setDeliveryCenter({ latitude: data.center_latitude, longitude: data.center_longitude });
      //   setDeliveryRadius(data.delivery_radius_km);
      // }

      const distance = calculateDistance(
        latitude, 
        longitude, 
        deliveryCenter.latitude, 
        deliveryCenter.longitude
      );
      
      const isInRadius = distance <= deliveryRadius;
      setIsInDeliveryRadius(isInRadius);
      return isInRadius;
    } catch (error) {
      console.error("Error checking delivery radius:", error);
      setIsInDeliveryRadius(false);
      return false;
    }
  };

  // Get current location using browser geolocation API
  const getCurrentLocation = async (): Promise<GeolocationPosition | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          console.error("Error getting location:", error);
          resolve(null);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    });
  };

  // Convert database address format to application address format
  const convertDbToAddress = (dbAddress: any): Address => {
    // Extract latitude and longitude if they exist
    const coordinates = dbAddress.latitude && dbAddress.longitude 
      ? { latitude: Number(dbAddress.latitude), longitude: Number(dbAddress.longitude) }
      : undefined;
    
    // Construct the address object with minimum required fields
    return {
      id: dbAddress.id,
      user_id: dbAddress.user_id,
      label: dbAddress.label || 'Home',
      full_address: dbAddress.address_line || '',
      city: dbAddress.city || '',
      notes: dbAddress.notes,
      is_default: !!dbAddress.is_default,
      coordinates
    };
  };

  // Convert application address format to database format
  const convertAddressToDb = (address: Partial<Address>) => {
    const dbAddress: any = {
      user_id: address.user_id,
      address_line: address.full_address,
      city: address.city,
      notes: address.notes
    };

    // Add coordinates if they exist
    if (address.coordinates) {
      dbAddress.latitude = address.coordinates.latitude;
      dbAddress.longitude = address.coordinates.longitude;
    }

    return dbAddress;
  };

  // Load addresses from database when user changes
  useEffect(() => {
    const loadAddresses = async () => {
      if (!user) {
        setAddresses([]);
        setSelectedAddress(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('addresses')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (data && data.length > 0) {
          // Convert database addresses to application addresses
          const appAddresses = data.map(convertDbToAddress);
          
          // Sort by is_default (default addresses first)
          appAddresses.sort((a, b) => (b.is_default ? 1 : 0) - (a.is_default ? 1 : 0));
          
          setAddresses(appAddresses);
          
          // Set default address as selected
          const defaultAddress = appAddresses.find(addr => addr.is_default) || appAddresses[0];
          setSelectedAddress(defaultAddress);
          
          // Check delivery radius if coordinates exist
          if (defaultAddress?.coordinates) {
            checkDeliveryRadius(
              defaultAddress.coordinates.latitude,
              defaultAddress.coordinates.longitude
            );
          }
        } else {
          setAddresses([]);
          setSelectedAddress(null);
        }
      } catch (error) {
        console.error("Error loading addresses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAddresses();
  }, [user]);

  const addAddress = async (addressData: Omit<Address, "id" | "user_id" | "is_default">) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Check if this is the first address (make it default)
      const isDefault = addresses.length === 0;
      
      // Create database format
      const dbAddress = {
        ...convertAddressToDb(addressData as Partial<Address>),
        user_id: user.id,
        is_default: isDefault
      };
      
      const { data, error } = await supabase
        .from('addresses')
        .insert(dbAddress)
        .select()
        .single();
        
      if (error) throw error;
      
      if (data) {
        // Convert back to application format
        const newAddress = convertDbToAddress(data);
        
        setAddresses(prev => [...prev, newAddress]);
        
        // If this is the first address, set it as selected
        if (isDefault) {
          setSelectedAddress(newAddress);
        }
        
        // Check delivery radius if coordinates exist
        if (newAddress.coordinates) {
          checkDeliveryRadius(
            newAddress.coordinates.latitude,
            newAddress.coordinates.longitude
          );
        }
      }
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateAddress = async (updated: Address) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Convert to database format
      const dbAddress = convertAddressToDb(updated);
      
      // Keep is_default status
      if (updated.is_default) {
        dbAddress.is_default = true;
      }
      
      const { error } = await supabase
        .from('addresses')
        .update(dbAddress)
        .eq('id', updated.id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      setAddresses(prev => 
        prev.map(address => (address.id === updated.id ? updated : address))
      );
      
      // Update selected address if it was the one updated
      if (selectedAddress?.id === updated.id) {
        setSelectedAddress(updated);
        
        // Check delivery radius if coordinates exist
        if (updated.coordinates) {
          checkDeliveryRadius(
            updated.coordinates.latitude,
            updated.coordinates.longitude
          );
        }
      }
    } catch (error) {
      console.error("Error updating address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteAddress = async (id: string) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('addresses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      const updatedAddresses = addresses.filter(address => address.id !== id);
      setAddresses(updatedAddresses);
      
      // If we deleted the selected address, select another one
      if (selectedAddress?.id === id) {
        const newSelected = updatedAddresses.find(addr => addr.is_default) || updatedAddresses[0] || null;
        setSelectedAddress(newSelected);
        
        // Check delivery radius for new selected address
        if (newSelected?.coordinates) {
          checkDeliveryRadius(
            newSelected.coordinates.latitude,
            newSelected.coordinates.longitude
          );
        } else {
          setIsInDeliveryRadius(null);
        }
      }
      
      // If we deleted the default address and have other addresses, make another one default
      if (addresses.find(addr => addr.id === id)?.is_default && updatedAddresses.length > 0) {
        const newDefault = updatedAddresses[0];
        await setDefaultAddress(newDefault.id);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // First, set all addresses to non-default
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);
      
      // Then set the selected address as default
      const { error } = await supabase
        .from('addresses')
        .update({ is_default: true })
        .eq('id', id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setAddresses(prev => 
        prev.map(address => ({
          ...address,
          is_default: address.id === id
        }))
      );
      
      // Update selected address
      const newDefault = addresses.find(addr => addr.id === id) || null;
      if (newDefault) {
        setSelectedAddress(newDefault);
        
        // Check delivery radius
        if (newDefault.coordinates) {
          checkDeliveryRadius(
            newDefault.coordinates.latitude,
            newDefault.coordinates.longitude
          );
        }
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const selectAddress = (address: Address | null) => {
    setSelectedAddress(address);
    
    // Check delivery radius for selected address
    if (address?.coordinates) {
      checkDeliveryRadius(
        address.coordinates.latitude,
        address.coordinates.longitude
      );
    } else {
      setIsInDeliveryRadius(null);
    }
  };

  return (
    <AddressContext.Provider 
      value={{ 
        addresses, 
        selectedAddress,
        isLoading,
        isInDeliveryRadius,
        addAddress, 
        deleteAddress, 
        updateAddress,
        setDefaultAddress,
        selectAddress,
        checkDeliveryRadius,
        getCurrentLocation
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export const useAddresses = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddresses must be used within an AddressProvider");
  }
  return context;
};
