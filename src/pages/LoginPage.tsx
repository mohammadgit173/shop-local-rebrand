import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { user, isLoading: userLoading, refreshUserProfile } = useUser();
  const { toast } = useToast();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user && !userLoading) {
      navigate("/");
    }
  }, [user, userLoading, navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[handleAuth] Form submitted");
  
    setIsLoading(true);
    setError("");
  
    try {
      if (mode === "login") {
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
    
        console.log("[handleAuth] Login result:", { data, loginError });
    
        if (loginError) {
          setError("Invalid credentials. Please try again.");
          setIsLoading(false);
          return;
        }
    
        if (data?.session) {
          // Let the auth state listener in UserContext handle the session update
          // This avoids race conditions between manual updates and listener updates
          
          // Wait a moment for the auth state to propagate
          setTimeout(async () => {
            // Check if profile exists in the users table
            const { data: profileData, error: profileError } = await supabase
              .from("users")
              .select("phone")
              .eq("id", data.session.user.id)
              .single();
      
            console.log("[handleAuth] Profile data fetched:", { profileData, profileError });
      
            if (!profileData?.phone && profileError?.code === "PGRST116") {
              console.log("[handleAuth] No profile found. Navigating to complete-profile...");
              navigate("/complete-profile");
            } else {
              console.log("[handleAuth] Profile found. Navigating to home...");
              toast({
                title: "Welcome back!",
                description: "You have successfully logged in.",
              });
              navigate("/");
            }
            
            setIsLoading(false);
          }, 500);
        }
      } else {
        // Registration flow
        const { data, error: signupError } = await supabase.auth.signUp({
          email,
          password,
        });
    
        if (signupError) {
          setError(signupError.message);
          setIsLoading(false);
          return;
        }
    
        if (data?.user) {
          // Some Supabase instances may require email confirmation
          if (data.session) {
            // Auto-sign in (email confirmation not required)
            // Let the auth state listener handle the session update
            setTimeout(() => {
              navigate("/complete-profile");
              setIsLoading(false);
            }, 500);
          } else {
            // Email confirmation required
            setEmailSent(true);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError("");
    setEmailSent(false);
  };

  return (
    <Layout hideNav>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">
                {mode === "login" ? "Login" : "Register"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {emailSent ? (
                <div className="text-center space-y-4">
                  <h2 className="text-lg font-bold text-green-600">Check Your Email</h2>
                  <p className="text-gray-600 text-sm">
                    We sent a confirmation link to <strong>{email}</strong>.
                    Please check your inbox to complete registration.
                  </p>
                  <Button onClick={toggleMode} className="w-full mt-4">
                    Back to Login
                  </Button>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading || userLoading}
                    >
                      {isLoading || userLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {mode === "login" ? "Logging in..." : "Registering..."}
                        </>
                      ) : mode === "login" ? "Login" : "Register"}
                    </Button>
                  </form>

                  <div className="text-center mt-4">
                    <span className="text-sm text-gray-500">
                      {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                      <button onClick={toggleMode} className="text-blue-600 font-medium underline">
                        {mode === "login" ? "Register" : "Login"}
                      </button>
                    </span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
