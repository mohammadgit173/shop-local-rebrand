
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Loader2, User, Phone, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

const CompleteProfilePage = () => {
  const { user, isLoading: userLoading, refreshUserProfile } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!user && !userLoading) {
      navigate("/login");
      return;
    }
    
    // If user profile is already complete, redirect to profile page
    if (user?.full_name && user?.phone && !userLoading) {
      navigate("/user/profile");
      return;
    }
    
    // Pre-fill form with any existing user data
    if (user) {
      if (user.full_name) {
        setFullName(user.full_name);
      }
      if (user.phone) {
        setPhone(user.phone);
      }
    }
  }, [user, userLoading, navigate]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    if (!user?.id) {
      setError("User session not found. Please log in again.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check if user record already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (fetchError) {
        throw fetchError;
      }

      if (existingUser) {
        // Update existing user
        const { error: updateError } = await supabase
          .from("users")
          .update({
            full_name: fullName,
            phone: phone,
          })
          .eq("id", user.id);

        if (updateError) throw updateError;
      } else {
        // Insert new user
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            id: user.id,
            full_name: fullName,
            phone: phone,
          });

        if (insertError) throw insertError;
      }

      // Refresh user profile to update context
      await refreshUserProfile();
      
      toast({
        title: "Profile completed",
        description: "Your profile has been successfully updated.",
      });
      
      // Redirect to profile page after successful update
      navigate("/user/profile");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setError("Failed to save your profile. " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/");
  };

  // Show loading state while checking user authentication
  if (userLoading) {
    return (
      <Layout hideNav>
        <div className="container mx-auto px-4 py-10 flex flex-col items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading your profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideNav>
      <div className="container mx-auto px-4 py-10 flex flex-col items-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Complete Your Profile
            </CardTitle>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="pl-10"
                    placeholder="+961 XX XXX XXX"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={handleSkip}
                >
                  Skip for Now
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : "Save Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CompleteProfilePage;
