import { Button } from "@/components/ui/button";
import { UserProfileCard } from "@/components/user/UserProfileCard";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen px-4 py-6 space-y-6 bg-gray-50">
      {/* Profile Card */}
      <UserProfileCard />

      {/* Account Actions */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-lg font-semibold">My Account</h2>
        <div className="flex flex-col divide-y divide-gray-100">
          <SettingsItem label="Edit Profile" onClick={() => navigate("/user/edit-profile")} />
          <SettingsItem label="My Orders" onClick={() => navigate("/user/orders")} />
          <SettingsItem label="Settings" onClick={() => navigate("/user/settings")} />
        </div>
      </div>

      {/* Logout Button */}
      <div className="mt-auto">
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => console.log("Handle logout here")}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
