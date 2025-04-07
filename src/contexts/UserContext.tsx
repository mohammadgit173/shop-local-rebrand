
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user profile from Supabase Auth and database
  const refreshUserProfile = async () => {
    console.log("[UserContext] Refreshing user profile...");
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if (authError) {
      console.error("[UserContext] Error fetching auth user:", authError);
      setUser(null);
      return;
    }

    if (authData?.user) {
      const supabaseUser = authData.user;

      // Fetch additional user data from the users table
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", supabaseUser.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        console.error("[UserContext] Error fetching user profile:", profileError);
      }

      // Combine auth data with profile data
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        full_name: profileData?.full_name || supabaseUser.user_metadata?.full_name || "",
        avatar_url: profileData?.avatar_url || supabaseUser.user_metadata?.avatar_url || "",
        phone: profileData?.phone || supabaseUser.user_metadata?.phone || "",
      });

      console.log("[UserContext] User set:", {
        id: supabaseUser.id,
        email: supabaseUser.email,
        full_name: profileData?.full_name,
      });
    } else {
      setUser(null);
      console.log("[UserContext] No active user session.");
    }
  };

  useEffect(() => {
    console.log("[UserContext] Initial load...");
    refreshUserProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("[UserContext] Auth state changed:", event);

        if (session?.user) {
          const supabaseUser = session.user;

          // Fetch additional user data from the users table
          const { data: profileData, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("id", supabaseUser.id)
            .single();

          if (profileError && profileError.code !== "PGRST116") {
            console.error("[UserContext] Error fetching user profile:", profileError);
          }

          // Combine auth data with profile data
          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email || "",
            full_name: profileData?.full_name || supabaseUser.user_metadata?.full_name || "",
            avatar_url: profileData?.avatar_url || supabaseUser.user_metadata?.avatar_url || "",
            phone: profileData?.phone || supabaseUser.user_metadata?.phone || "",
          });

          console.log("[UserContext] User updated from session:", {
            id: supabaseUser.id,
            email: supabaseUser.email,
            full_name: profileData?.full_name,
          });
        } else {
          setUser(null);
          console.log("[UserContext] No session — user logged out.");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, refreshUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
