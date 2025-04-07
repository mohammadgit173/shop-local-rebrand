import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { supabase } from "@/integrations/supabase/client";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const navigate = useNavigate();
  const { refreshUserProfile } = useUser();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[handleAuth] Form submitted");
  
    setIsLoading(true);
    setError("");
  
    if (mode === "login") {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      console.log("[handleAuth] Result:", { data, loginError });
  
      if (loginError) {
        setError("Invalid credentials. Please try again.");
      } else if (data?.session?.user) {
        console.log("[handleAuth] Logged in session user:", data.session.user);
  
        // Step 1: Refresh context
        console.log("[handleAuth] Refreshing user profile...");
        await refreshUserProfile();
  
        // Step 2: Fetch profile phone manually
        const { data: profileData, error: profileError } = await supabase
          .from("users")
          .select("phone")
          .eq("id", data.session.user.id)
          .single();
  
        console.log("[handleAuth] Profile data fetched:", { profileData, profileError });
  
        if (profileError) {
          console.error("Profile fetch error:", profileError);
        }
  
        if (!profileData?.phone) {
          console.log("[handleAuth] No phone found. Navigating to complete-profile...");
          navigate("/complete-profile");
        } else {
          console.log("[handleAuth] Phone found. Navigating to home...");
          navigate("/");
        }
      }
    } else {
      const { error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (signupError) {
        setError(signupError.message);
      } else {
        setEmailSent(true);
      }
    }
  
    setIsLoading(false);
    console.log("[handleAuth] Done");
  };
  

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "register" : "login"));
    setError("");
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
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-brand-primary text-brand-dark hover:bg-brand-accent"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : mode === "login" ? "Login" : "Register"}
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
