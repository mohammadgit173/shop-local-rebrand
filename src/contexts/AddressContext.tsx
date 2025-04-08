// src/contexts/AddressContext.tsx

import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Address {
  id: string;
  label: string;
  full_address: string;
  city: string;
  area?: string;
  building?: string;
  floor?: string;
  landmark?: string;
  notes?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface AddressContextType {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  deleteAddress: (id: string) => void;
  updateAddress: (address: Address) => void;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider = ({ children }: { children: React.ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress: Address = { ...address, id: uuidv4() };
    setAddresses((prev) => [...prev, newAddress]);
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((address) => address.id !== id));
  };

  const updateAddress = (updated: Address) => {
    setAddresses((prev) =>
      prev.map((address) => (address.id === updated.id ? updated : address))
    );
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress, deleteAddress, updateAddress }}>
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
