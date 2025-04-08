import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/contexts/OrderContext";
import { useAddresses } from "@/contexts/AddressContext";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, MapPin, CreditCard, Banknote, AlertCircle, CheckCircle, ShoppingCart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AddressList from "@/components/address/AddressList";
import AddressForm from "@/components/address/AddressForm";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { cartItems, isLoading, placeOrder } = useOrders();
  const { selectedAddress, isInDeliveryRadius } = useAddresses();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<"cash_on_delivery">("cash_on_delivery");
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity), 
    0
  );
  
  // Delivery fee
  const deliveryFee = subtotal > 50 ? 0 : 5;
  
  // Total
  const total = subtotal + deliveryFee;

  const handleCheckout = async () => {
    if (!selectedAddress) {
      toast({
        title: "No delivery address",
        description: "Please select a delivery address to continue.",
        variant: "destructive"
      });
      return;
    }
    
    if (selectedAddress.coordinates && !isInDeliveryRadius) {
      toast({
        title: "Outside delivery area",
        description: "Your selected address is outside our delivery area. Please choose another address.",
        variant: "destructive"
      });
      return;
    }
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Please add items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const order = await placeOrder();
      
      if (order) {
        setOrderPlaced(true);
        
        // Show success message
        toast({
          title: "Order placed successfully!",
          description: `Your order #${order.id.substring(0, 8)} has been placed and will be delivered soon.`,
        });
        
        // Redirect to orders page after a short delay
        setTimeout(() => {
          navigate("/user/orders");
        }, 3000);
      } else {
        toast({
          title: "Failed to place order",
          description: "There was an error processing your order. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast({
        title: "Checkout failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your order. We'll deliver it to you soon.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Redirecting to your orders page...
            </p>
            <Button onClick={() => navigate("/user/orders")}>
              View My Orders
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Order Summary */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <div className="text-center py-8 space-y-4">
              <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <h3 className="font-medium">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground">
                  Add items to your cart to proceed with checkout.
                </p>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="mt-4"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              {/* Price Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${deliveryFee.toFixed(2)}`
                    )}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {subtotal < 50 && (
                <div className="text-sm text-muted-foreground mt-4">
                  Add ${(50 - subtotal).toFixed(2)} more to qualify for free delivery.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Checkout Details */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Delivery Address */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              Delivery Address
            </h3>
            
            {selectedAddress ? (
              <div className="border rounded-lg p-3 relative">
                <div className="space-y-1">
                  <div className="font-medium">{selectedAddress.label}</div>
                  <div className="text-sm">{selectedAddress.full_address}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedAddress.city}{selectedAddress.area ? `, ${selectedAddress.area}` : ''}
                  </div>
                  {selectedAddress.building && (
                    <div className="text-sm text-muted-foreground">
                      {selectedAddress.building}{selectedAddress.floor ? `, ${selectedAddress.floor}` : ''}
                    </div>
                  )}
                  
                  {selectedAddress.coordinates && !isInDeliveryRadius && (
                    <div className="flex items-center text-red-500 text-sm mt-2">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      This address is outside our delivery area
                    </div>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => setIsAddressDialogOpen(true)}
                >
                  Change Address
                </Button>
              </div>
            ) : (
              <div className="border border-dashed rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm mb-3">
                  No delivery address selected
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddressDialogOpen(true)}
                >
                  Select Address
                </Button>
              </div>
            )}
          </div>
          
          {/* Payment Method */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Method
            </h3>
            
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={(value) => setPaymentMethod(value as "cash_on_delivery")}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 border rounded-lg p-3">
                <RadioGroupItem value="cash_on_delivery" id="cash" />
                <Label htmlFor="cash" className="flex items-center cursor-pointer">
                  <Banknote className="h-4 w-4 mr-2 text-green-600" />
                  Cash on Delivery
                </Label>
              </div>
              {/* Additional payment methods can be added here in the future */}
            </RadioGroup>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            className="w-full" 
            size="lg"
            disabled={
              isProcessing || 
              cartItems.length === 0 || 
              !selectedAddress || 
              (selectedAddress.coordinates && !isInDeliveryRadius)
            }
            onClick={handleCheckout}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Place Order • $${total.toFixed(2)}`
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {/* Address Selection Dialog */}
      <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <AddressList />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutForm;
