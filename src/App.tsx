import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppProvider } from "@/contexts/AppContext";
import { UserProvider } from "@/contexts/UserContext";

// Pages
import Index from "@/pages/Index";
import CategoriesPage from "@/pages/CategoriesPage";
import CategoryPage from "@/pages/CategoryPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import SearchPage from "@/pages/SearchPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";

// New, Mobile-Optimized User Pages
import ProfilePage from "@/pages/user/profile";
import EditProfilePage from "@/pages/user/edit-profile";
import OrdersPage from "@/pages/user/orders";
import SettingsPage from "@/pages/user/settings";
import CompleteProfilePage from "./pages/user/complete-profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AppProvider>
        <UserProvider>
          <TooltipProvider>
            <Toaster />
            <SonnerToaster />
            <BrowserRouter>
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Index />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:id" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* New User Pages */}
                <Route path="/user/profile" element={<ProfilePage />} />
                <Route
                  path="/user/edit-profile"
                  element={<EditProfilePage />}
                />
                <Route path="/user/orders" element={<OrdersPage />} />
                <Route path="/user/settings" element={<SettingsPage />} />

                <Route
                  path="/complete-profile"
                  element={<CompleteProfilePage />}
                />

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </UserProvider>
      </AppProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
