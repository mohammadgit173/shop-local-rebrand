import { useState, useEffect } from "react";
import { useAddresses } from "@/contexts/AddressContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MapPin, Home, Building, Navigation, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

interface AddressFormProps {
  onComplete?: () => void;
  existingAddress?: any;
}

const AddressForm = ({ onComplete, existingAddress }: AddressFormProps) => {
  const { addAddress, updateAddress, checkDeliveryRadius, getCurrentLocation, isLoading } = useAddresses();
  const { toast } = useToast();

  const [label, setLabel] = useState(existingAddress?.label || "Home");
  const [fullAddress, setFullAddress] = useState(existingAddress?.full_address || "");
  const [city, setCity] = useState(existingAddress?.city || "");
  const [area, setArea] = useState(existingAddress?.area || "");
  const [building, setBuilding] = useState(existingAddress?.building || "");
  const [floor, setFloor] = useState(existingAddress?.floor || "");
  const [landmark, setLandmark] = useState(existingAddress?.landmark || "");
  const [notes, setNotes] = useState(existingAddress?.notes || "");
  const [coordinates, setCoordinates] = useState(existingAddress?.coordinates || null);
  
  const [locationError, setLocationError] = useState("");
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isInDeliveryArea, setIsInDeliveryArea] = useState<boolean | null>(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  useEffect(() => {
    // If we have coordinates, check if they're in delivery area
    if (coordinates) {
      checkDeliveryStatus();
    }
  }, [coordinates]);

  const checkDeliveryStatus = async () => {
    if (!coordinates) return;
    
    const isInArea = await checkDeliveryRadius(coordinates.latitude, coordinates.longitude);
    setIsInDeliveryArea(isInArea);
  };

  const handleGetLocation = async () => {
    setIsGettingLocation(true);
    setLocationError("");
    
    try {
      const position = await getCurrentLocation();
      
      if (!position) {
        setLocationError("Unable to get your location. Please check your device settings and try again.");
        return;
      }
      
      const { latitude, longitude } = position.coords;
      setCoordinates({ latitude, longitude });
      
      // Check if location is within delivery area
      const isInArea = await checkDeliveryRadius(latitude, longitude);
      setIsInDeliveryArea(isInArea);
      
      if (!isInArea) {
        toast({
          title: "Outside Delivery Area",
          description: "Your location appears to be outside our delivery area. You can still save this address, but delivery may not be available.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Location Detected",
          description: "Your location has been successfully detected and is within our delivery area.",
        });
      }
      
      setUseCurrentLocation(true);
    } catch (error) {
      console.error("Error getting location:", error);
      setLocationError("Failed to get your location. Please try again or enter address manually.");
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullAddress || !city) {
      toast({
        title: "Missing Information",
        description: "Please provide at least the address and city.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const addressData = {
        label,
        full_address: fullAddress,
        city,
        area,
        building,
        floor,
        landmark,
        notes,
        coordinates: useCurrentLocation ? coordinates : null
      };
      
      if (existingAddress) {
        await updateAddress({
          ...existingAddress,
          ...addressData
        });
        toast({
          title: "Address Updated",
          description: "Your address has been successfully updated."
        });
      } else {
        await addAddress(addressData);
        toast({
          title: "Address Added",
          description: "Your new address has been successfully added."
        });
      }
      
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Error saving address:", error);
      toast({
        title: "Error",
        description: "Failed to save your address. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {existingAddress ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="label">Address Label</Label>
            <div className="relative">
              <Home className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="pl-10"
                placeholder="Home, Work, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullAddress">Full Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input
                id="fullAddress"
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                required
                className="pl-10"
                placeholder="Street address"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Area/District</Label>
              <Input
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                placeholder="Area or district"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="building">Building/House</Label>
              <div className="relative">
                <Building className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="building"
                  value={building}
                  onChange={(e) => setBuilding(e.target.value)}
                  className="pl-10"
                  placeholder="Building name/number"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="floor">Floor/Apartment</Label>
              <Input
                id="floor"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
                placeholder="Floor, apartment #"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="landmark">Landmark</Label>
            <Input
              id="landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="Nearby landmark"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Delivery Notes</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Additional delivery instructions"
              rows={2}
            />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="use-location" className="cursor-pointer">Use my current location</Label>
              <Switch
                id="use-location"
                checked={useCurrentLocation}
                onCheckedChange={setUseCurrentLocation}
              />
            </div>
            
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={handleGetLocation}
              disabled={isGettingLocation}
            >
              {isGettingLocation ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting location...
                </>
              ) : (
                <>
                  <Navigation className="mr-2 h-4 w-4" />
                  Detect My Location
                </>
              )}
            </Button>
            
            {locationError && (
              <div className="text-red-500 text-sm flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{locationError}</span>
              </div>
            )}
            
            {isInDeliveryArea !== null && (
              <div className={`${isInDeliveryArea ? 'text-green-600' : 'text-red-500'} text-sm flex items-start gap-2`}>
                {isInDeliveryArea ? (
                  <>
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Your location is within our delivery area.</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <span>Your location is outside our delivery area. Delivery may not be available.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        {onComplete && (
          <Button variant="outline" onClick={onComplete}>
            Cancel
          </Button>
        )}
        <Button 
          onClick={handleSubmit}
          disabled={isLoading || isGettingLocation}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            existingAddress ? "Update Address" : "Save Address"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressForm;
