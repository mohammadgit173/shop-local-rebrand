import { useEffect, useState } from "react";
import { useOrders, Order, OrderStatus } from "@/contexts/OrderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatDate";
import { Loader2, Package, ShoppingBag, Clock, CheckCircle, XCircle, TruckIcon } from "lucide-react";

const OrderHistoryList = () => {
  const { orders, isLoading, fetchOrders } = useOrders();
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredOrders(orders);
    } else if (activeTab === "active") {
      setFilteredOrders(
        orders.filter(
          order => 
            order.status === "pending" || 
            order.status === "confirmed" || 
            order.status === "preparing" || 
            order.status === "out_for_delivery"
        )
      );
    } else if (activeTab === "completed") {
      setFilteredOrders(
        orders.filter(
          order => order.status === "delivered" || order.status === "cancelled"
        )
      );
    }
  }, [orders, activeTab]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case "preparing":
        return <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">Preparing</Badge>;
      case "out_for_delivery":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Out for Delivery</Badge>;
      case "delivered":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "confirmed":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case "preparing":
        return <Package className="h-5 w-5 text-indigo-500" />;
      case "out_for_delivery":
        return <TruckIcon className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab}>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-8 space-y-4">
                <Package className="h-12 w-12 mx-auto text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="font-medium">No orders found</h3>
                  <p className="text-sm text-muted-foreground">
                    {activeTab === "all" 
                      ? "You haven't placed any orders yet." 
                      : activeTab === "active" 
                        ? "You don't have any active orders." 
                        : "You don't have any completed orders."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-medium">Order #{order.id.substring(0, 8)}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(new Date(order.created_at))}
                          </p>
                        </div>
                      </div>
                      <div>
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm font-medium">Items:</div>
                      <div className="mt-2 space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between">
                            <div className="flex-1">
                              <span className="font-medium">{item.name}</span>
                              <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                            </div>
                            <div className="font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex justify-between">
                      <div className="text-sm">
                        <div className="font-medium">Delivery Address:</div>
                        <div className="text-muted-foreground">
                          {order.address_details?.full_address}, {order.address_details?.city}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Total</div>
                        <div className="font-bold text-lg">${order.total.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default OrderHistoryList;
