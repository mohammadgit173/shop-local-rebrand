import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
};

interface UserContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  refreshUserProfile: () => Promise<void>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper function to fetch user profile data
const fetchUserProfile = async (userId: string) => {
  const { data: profileData, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (profileError && profileError.code !== "PGRST116") {
    console.error("[UserContext] Error fetching user profile:", profileError);
  }

  return profileData;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch user profile from Supabase Auth and database
  const refreshUserProfile = async () => {
    console.log("[UserContext] Refreshing user profile...");
    setIsLoading(true);
    
    try {
      // Get current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("[UserContext] Error fetching session:", sessionError);
        setUser(null);
        setSession(null);
        return;
      }
      
      setSession(sessionData?.session || null);
      
      if (!sessionData?.session) {
        console.log("[UserContext] No active session found.");
        setUser(null);
        return;
      }
      
      const supabaseUser = sessionData.session.user;
      
      // Fetch additional user data from the users table
      const profileData = await fetchUserProfile(supabaseUser.id);
      
      // Combine auth data with profile data
      const userData = {
        id: supabaseUser.id,
        email: supabaseUser.email || "",
        full_name: profileData?.full_name || supabaseUser.user_metadata?.full_name || "",
        avatar_url: profileData?.avatar_url || supabaseUser.user_metadata?.avatar_url || "",
        phone: profileData?.phone || supabaseUser.user_metadata?.phone || "",
      };
      
      setUser(userData);
      
      console.log("[UserContext] User set:", {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
      });
    } catch (error) {
      console.error("[UserContext] Error in refreshUserProfile:", error);
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Clear user data
      setUser(null);
      setSession(null);
      
      // Clear any localStorage items that might be causing conflicts
      localStorage.removeItem('supabase.auth.token');
      
      console.log("[UserContext] User logged out successfully");
    } catch (error) {
      console.error("[UserContext] Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load and auth state change listener
  useEffect(() => {
    console.log("[UserContext] Initial load...");
    
    // Initial session check
    refreshUserProfile();
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("[UserContext] Auth state changed:", event);
        
        setSession(newSession);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          console.log("[UserContext] User signed out");
          return;
        }
        
        if (newSession?.user) {
          setIsLoading(true);
          try {
            const supabaseUser = newSession.user;
            
            // Fetch additional user data from the users table
            const profileData = await fetchUserProfile(supabaseUser.id);
            
            // Combine auth data with profile data
            const userData = {
              id: supabaseUser.id,
              email: supabaseUser.email || "",
              full_name: profileData?.full_name || supabaseUser.user_metadata?.full_name || "",
              avatar_url: profileData?.avatar_url || supabaseUser.user_metadata?.avatar_url || "",
              phone: profileData?.phone || supabaseUser.user_metadata?.phone || "",
            };
            
            setUser(userData);
            
            console.log("[UserContext] User updated from session:", {
              id: userData.id,
              email: userData.email,
              full_name: userData.full_name,
            });
          } catch (error) {
            console.error("[UserContext] Error updating user from session:", error);
          } finally {
            setIsLoading(false);
          }
        } else if (event !== 'INITIAL_SESSION') {
          // Only clear user if this isn't the initial session check
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
    <UserContext.Provider value={{ 
      user, 
      session, 
      isLoading, 
      setUser, 
      refreshUserProfile, 
      logout 
    }}>
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
