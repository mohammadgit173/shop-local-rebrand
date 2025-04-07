
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  BellOff,
  LogOut,
  Languages,
  Lock,
  HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
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
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>
        
        <Card className="border-none shadow-md mb-6">
          <CardContent className="p-0">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="h-5 w-5 text-primary" /> : <Sun className="h-5 w-5 text-primary" />}
                <Label htmlFor="dark-mode" className="font-medium">
                  Dark Mode
                </Label>
              </div>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <Separator />
            
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {notifications ? <Bell className="h-5 w-5 text-primary" /> : <BellOff className="h-5 w-5 text-primary" />}
                <Label htmlFor="notifications" className="font-medium">
                  Notifications
                </Label>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <Separator />
            
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 text-primary" />
                <Label className="font-medium">
                  Language
                </Label>
              </div>
              <Button variant="ghost" size="sm" className="text-sm">
                English (US)
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-md mb-6">
          <CardContent className="p-0">
            <div className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5 text-primary" />
                <span className="font-medium">Change Password</span>
              </div>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
            
            <Separator />
            
            <div className="px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <span className="font-medium">Help & Support</span>
              </div>
              <ArrowLeft className="h-5 w-5 text-gray-400 rotate-180" />
            </div>
          </CardContent>
        </Card>
        
        <Button
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => console.log("Handle logout here")}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </Layout>
  );
}
