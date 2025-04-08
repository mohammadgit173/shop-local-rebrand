import { useState } from "react";
import { useAddresses } from "@/contexts/AddressContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Plus, Home, Building, Edit, Trash2, Check, AlertCircle } from "lucide-react";
import AddressForm from "./AddressForm";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AddressList = () => {
  const { addresses, selectedAddress, isLoading, isInDeliveryRadius, deleteAddress, setDefaultAddress, selectAddress } = useAddresses();
  const { toast } = useToast();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<any>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const handleEdit = (address: any) => {
    setAddressToEdit(address);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (addressToDelete) {
      await deleteAddress(addressToDelete);
      setAddressToDelete(null);
      toast({
        title: "Address Deleted",
        description: "Your address has been successfully removed."
      });
    }
  };

  const handleSetDefault = async (id: string) => {
    await setDefaultAddress(id);
    toast({
      title: "Default Address Updated",
      description: "Your default delivery address has been updated."
    });
  };

  const handleSelect = (address: any) => {
    selectAddress(address);
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex justify-center items-center py-8">
            <div className="animate-pulse space-y-4 w-full">
              <div className="h-12 bg-gray-200 rounded w-full"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
              <div className="h-24 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold">Your Addresses</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <AddressForm onComplete={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {addresses.length === 0 ? (
          <div className="text-center py-8 space-y-4">
            <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
            <div className="space-y-2">
              <h3 className="font-medium">No addresses yet</h3>
              <p className="text-sm text-muted-foreground">
                Add your first delivery address to get started.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setIsAddDialogOpen(true)}
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Address
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div 
                key={address.id} 
                className={`border rounded-lg p-4 relative ${
                  selectedAddress?.id === address.id 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border'
                }`}
              >
                {address.is_default && (
                  <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
                
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {address.label === 'Home' ? (
                      <Home className="h-5 w-5 text-muted-foreground" />
                    ) : address.label === 'Work' ? (
                      <Building className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">{address.label}</h3>
                    </div>
                    
                    <p className="text-sm mt-1">{address.full_address}</p>
                    
                    <div className="text-sm text-muted-foreground mt-1">
                      {address.city}{address.area ? `, ${address.area}` : ''}
                    </div>
                    
                    {address.building && (
                      <div className="text-sm text-muted-foreground mt-1">
                        {address.building}{address.floor ? `, ${address.floor}` : ''}
                      </div>
                    )}
                    
                    {address.coordinates && (
                      <div className={`text-xs mt-2 flex items-center ${
                        isInDeliveryRadius ? 'text-green-600' : 'text-red-500'
                      }`}>
                        {isInDeliveryRadius ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Within delivery area
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Outside delivery area
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between mt-4 pt-3 border-t">
                  <div className="space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(address)}
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAddressToDelete(address.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                  
                  <div className="space-x-2">
                    {!address.is_default && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    
                    {selectedAddress?.id !== address.id && (
                      <Button 
                        size="sm"
                        onClick={() => handleSelect(address)}
                      >
                        Use This Address
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {/* Edit Address Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <AddressForm 
            existingAddress={addressToEdit} 
            onComplete={() => {
              setIsEditDialogOpen(false);
              setAddressToEdit(null);
            }} 
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!addressToDelete} onOpenChange={(open) => !open && setAddressToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this address. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(addressToDelete!)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default AddressList;
