
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import Layout from "@/components/layout/Layout";
import OrderHistoryList from "@/components/orders/OrderHistoryList";
import { OrderProvider } from "@/contexts/OrderContext";
import { Loader2 } from "lucide-react";

const OrdersPage = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading your orders...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <OrderProvider>
          <OrderHistoryList />
        </OrderProvider>
      </div>
    </Layout>
  );
};

export default OrdersPage;
