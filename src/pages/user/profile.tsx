import { Button } from "@/components/ui/button";
import { UserProfileCard } from "@/components/user/UserProfileCard";
import { useNavigate } from "react-router-dom";
import { SettingsItem } from "@/components/user/SettingsList";
import { 
  LogOut, 
  User,
  ShoppingBag,
  Settings as SettingsIcon
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <Layout>
        <div className="max-w-lg mx-auto px-4 py-6 text-center">
          <h1 className="text-xl font-bold">Please log in to view your profile.</h1>
          <Button className="mt-6" onClick={() => navigate("/login")}>
            Go to Login
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <UserProfileCard user={user} />

        {/* Account Actions */}
        <div className="bg-white rounded-xl shadow-md p-4 space-y-1">
          <h2 className="text-lg font-semibold px-1 mb-3">My Account</h2>
          <div className="flex flex-col">
            <SettingsItem 
              label="Edit Profile" 
              icon={User}
              onClick={() => navigate("/user/edit-profile")} 
            />
            <SettingsItem 
              label="My Orders" 
              icon={ShoppingBag}
              onClick={() => navigate("/user/orders")} 
            />
            <SettingsItem 
              label="Settings" 
              icon={SettingsIcon}
              onClick={() => navigate("/user/settings")} 
            />
          </div>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </Layout>
  );
}
