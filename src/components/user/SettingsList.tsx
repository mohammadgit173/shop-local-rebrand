
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Defining the SettingsItem component to be used in the profile page
export const SettingsItem = ({ 
  label, 
  onClick 
}: { 
  label: string; 
  onClick: () => void;
}) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center justify-between w-full py-3 text-left transition hover:bg-gray-50"
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 text-gray-400" />
    </button>
  );
};

// Also creating a SettingsList component that can be used to group settings items
export const SettingsList = () => {
  const navigate = useNavigate();
  
  const settingsItems = [
    { label: "Edit Profile", path: "/user/edit-profile" },
    { label: "My Orders", path: "/user/orders" },
    { label: "Settings", path: "/user/settings" }
  ];
  
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">My Account</h2>
      <div className="flex flex-col divide-y divide-gray-100">
        {settingsItems.map((item, index) => (
          <SettingsItem 
            key={index}
            label={item.label} 
            onClick={() => navigate(item.path)} 
          />
        ))}
      </div>
    </div>
  );
};

export default SettingsList;
