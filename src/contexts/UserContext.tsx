import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

type User = {
  id: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  refreshUserProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user profile from Supabase Auth
  const refreshUserProfile = async () => {
    console.log("[UserContext] Refreshing user profile...");
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("[UserContext] Error fetching user:", error);
      setUser(null);
      return;
    }

    if (data?.user) {
      const supabaseUser = data.user;

      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        fullName: supabaseUser.user_metadata?.full_name || "",
        avatarUrl: supabaseUser.user_metadata?.avatar_url || "",
      });

      console.log("[UserContext] User set:", {
        id: supabaseUser.id,
        email: supabaseUser.email,
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
      (_event, session) => {
        console.log("[UserContext] Auth state changed:", _event);

        if (session?.user) {
          const supabaseUser = session.user;

          setUser({
            id: supabaseUser.id,
            email: supabaseUser.email || "",
            fullName: supabaseUser.user_metadata?.full_name || "",
            avatarUrl: supabaseUser.user_metadata?.avatar_url || "",
          });

          console.log("[UserContext] User updated from session:", {
            id: supabaseUser.id,
            email: supabaseUser.email,
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
