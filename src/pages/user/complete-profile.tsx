
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { User, Phone, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CompleteProfilePage = () => {
  const { user, refreshUserProfile } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone.trim()) {
      setError("Phone number is required.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Check if user record already exists
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (existingUser) {
        // Update existing user
        const { error: updateError } = await supabase
          .from("users")
          .update({
            full_name: fullName,
            phone: phone,
          })
          .eq("id", user?.id);

        if (updateError) throw updateError;
      } else {
        // Insert new user
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            id: user?.id,
            full_name: fullName,
            phone: phone,
          });

        if (insertError) throw insertError;
      }

      // Refresh user profile
      await refreshUserProfile();
      
      toast({
        title: "Profile completed",
        description: "Your profile has been successfully updated.",
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setError("Failed to save your profile. " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

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

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name (optional)</Label>
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
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="pl-10"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : "Save and Continue"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CompleteProfilePage;
