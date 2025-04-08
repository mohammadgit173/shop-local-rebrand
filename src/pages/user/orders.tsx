
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrderHistoryList } from "@/components/user/OrderHistoryList";
import Layout from "@/components/layout/Layout";
import { Order } from "@/types";

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "12345",
    user_id: "user123",
    items: [
      {
        product_id: "prod1",
        name: "Organic Apples",
        price: 4.99,
        quantity: 2,
        total: 9.98,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFwcGxlfGVufDB8fDB8fHww"
      },
      {
        product_id: "prod2",
        name: "Fresh Milk",
        price: 3.49,
        quantity: 1,
        total: 3.49,
        image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbGt8ZW58MHx8MHx8fDA%3D"
      }
    ],
    subtotal: 13.47,
    delivery_fee: 2.99,
    total: 16.46,
    status: "delivered",
    payment_method: "Credit Card",
    payment_status: "paid",
    address: {
      id: "addr1",
      label: "Home",
      full_address: "123 Main St, Apt 4B",
      city: "New York",
      area: "Manhattan"
    },
    created_at: "2025-03-01T12:00:00Z"
  },
  {
    id: "67890",
    user_id: "user123",
    items: [
      {
        product_id: "prod3",
        name: "Organic Bananas",
        price: 2.99,
        quantity: 1,
        total: 2.99,
        image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww"
      }
    ],
    subtotal: 2.99,
    delivery_fee: 2.99,
    total: 5.98,
    status: "processing",
    payment_method: "PayPal",
    payment_status: "paid",
    address: {
      id: "addr1",
      label: "Home",
      full_address: "123 Main St, Apt 4B",
      city: "New York",
      area: "Manhattan"
    },
    created_at: "2025-02-20T09:30:00Z"
  }
];

export default function OrdersPage() {
  const navigate = useNavigate();
  const [orders] = useState<Order[]>(mockOrders);
  
  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate("/user/profile")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">My Orders</h1>
        </div>
        
        {/* Order history */}
        <OrderHistoryList orders={orders} />
      </div>
    </Layout>
  );
}
