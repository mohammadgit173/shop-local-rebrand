
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  User, 
  ShoppingBag, 
  Settings as SettingsIcon,
  CreditCard,
  Heart,
  MapPin,
  Bell
} from 'lucide-react';

export const SettingsItem = ({ 
  label, 
  onClick,
  icon: Icon 
}: { 
  label: string; 
  onClick: () => void;
  icon?: React.ElementType;
}) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full py-4 px-1 text-left transition hover:bg-gray-50 rounded-md group"
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-5 h-5 text-primary" />}
        <span className="font-medium">{label}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
    </button>
  );
};

export const SettingsList = () => {
  const navigate = useNavigate();
  
  const settingsItems = [
    { label: "Edit Profile", path: "/user/edit-profile", icon: User },
    { label: "My Orders", path: "/user/orders", icon: ShoppingBag },
    { label: "Payment Methods", path: "/user/payment", icon: CreditCard },
    { label: "Saved Addresses", path: "/user/addresses", icon: MapPin },
    { label: "Wishlist", path: "/user/wishlist", icon: Heart },
    { label: "Notifications", path: "/user/notifications", icon: Bell },
    { label: "Settings", path: "/user/settings", icon: SettingsIcon }
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-md p-4 space-y-1">
      <h2 className="text-lg font-semibold px-1 mb-3">My Account</h2>
      <div className="flex flex-col">
        {settingsItems.map((item, index) => (
          <SettingsItem 
            key={index}
            label={item.label} 
            icon={item.icon}
            onClick={() => navigate(item.path)} 
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsList;
