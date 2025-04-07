import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const CompleteProfilePage = () => {
  const { user, refreshUserProfile } = useUser();
  const navigate = useNavigate();

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

    const { error: insertError } = await supabase.from("users").insert({
      id: user?.id,
      full_name: fullName,
      phone: phone,
      avatar_url: null,
    });

    if (insertError) {
      setError("Failed to save your profile. Please try again.");
      setIsLoading(false);
      return;
    }

    await refreshUserProfile(); // 🔥 Refresh full profile from database
    navigate("/");
    setIsLoading(false);
  };

  return (
    <Layout hideNav>
      <div className="container mx-auto px-4 py-10 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-center">
            Complete Your Profile
          </h1>

          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name (optional)</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="+961 12345678"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-primary text-brand-dark hover:bg-brand-accent"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save and Continue"}
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CompleteProfilePage;
