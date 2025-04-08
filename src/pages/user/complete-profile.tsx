import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { haversineDistance } from "@/lib/location";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { Label } from "@/components/ui/label";
import { Loader2, MapPin } from "lucide-react";

export default function CompleteProfilePage() {
  const { user, refreshUserProfile } = useUser();
  const navigate = useNavigate();
  const [addressLine, setAddressLine] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
        });
      }
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // 1. Get user's location
      const position = await getCurrentPosition();
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // 2. Get store center
      const { data: storeData, error: storeError } = await supabase
        .from("store_config")
        .select("*")
        .single();

      if (storeError || !storeData) throw new Error("Store location not found.");

      const distance = haversineDistance(
        storeData.center_latitude,
        storeData.center_longitude,
        latitude,
        longitude
      );

      console.log("User distance from store:", distance.toFixed(2), "km");

      // 3. Check if within allowed radius
      if (distance > storeData.delivery_radius_km) {
        throw new Error(`Sorry, you are outside our delivery zone.`);
      }

      // 4. Insert address
      await supabase.from("addresses").insert({
        user_id: user?.id,
        address_line: addressLine,
        latitude,
        longitude,
      });

      // 5. Update user profile
      await supabase.from("users").update({
        full_name: fullName,
        phone: phone,
      }).eq("id", user?.id);

      await refreshUserProfile();
      navigate("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to save profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout hideNav>
      <div className="max-w-md mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Complete Your Profile</h1>

        {error && <div className="bg-red-50 text-red-600 p-2 rounded">{error}</div>}

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+961 70 123 456"
            />
          </div>

          <div className="space-y-2">
            <Label>Address Description</Label>
            <Input
              value={addressLine}
              onChange={(e) => setAddressLine(e.target.value)}
              placeholder="Near X Building..."
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-primary hover:bg-brand-accent"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Save My Address
              </>
            )}
          </Button>
        </form>
      </div>
    </Layout>
  );
}
