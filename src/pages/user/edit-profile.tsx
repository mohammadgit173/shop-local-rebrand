
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  User,
  Mail,
  Phone,
  Camera
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate("/user/profile");
    }, 1000);
  };

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
          <h1 className="text-xl font-semibold">Edit Profile</h1>
        </div>
        
        <Card className="border-none shadow-md">
          <CardHeader className="flex items-center pt-6 pb-0">
            <div className="relative">
              <Avatar className="h-24 w-24 border-2 border-primary">
                <AvatarImage src="/assets/profile-placeholder.jpg" alt="User profile" />
                <AvatarFallback className="bg-muted">
                  <User className="h-12 w-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 rounded-full bg-primary p-1.5 text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    defaultValue="John Doe"
                    className="pl-10" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email" 
                    defaultValue="john.doe@example.com"
                    className="pl-10" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Your phone number" 
                    defaultValue="+1 (555) 123-4567"
                    className="pl-10" 
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="px-6 pb-6 pt-2">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
}
