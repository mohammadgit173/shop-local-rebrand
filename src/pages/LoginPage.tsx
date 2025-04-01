
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { sampleUser } from '@/data/mockData';
import Layout from '@/components/layout/Layout';
import { storeConfig } from '@/config/storeConfig';

const LoginPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { login } = useApp();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Mock login with a timeout to simulate API call
    setTimeout(() => {
      if (email === 'customer@example.com' && password === 'password') {
        login(sampleUser);
        navigate('/');
      } else {
        setError(t('invalidCredentials'));
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    // Mock social login
    setTimeout(() => {
      login(sampleUser);
      navigate('/');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <Layout hideNav>
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <img 
              src={storeConfig.logo} 
              alt={storeConfig.name} 
              className="h-16 w-auto mx-auto mb-2"
            />
            <h1 className="text-2xl font-bold">{t('welcome')}</h1>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-center">{t('login')}</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t('email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@example.com"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t('password')}</Label>
                    <Link 
                      to="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-brand-primary text-brand-dark hover:bg-brand-accent" 
                  disabled={isLoading}
                >
                  {isLoading ? t('loggingIn') : t('login')}
                </Button>
              </form>
              
              {storeConfig.enabledFeatures.socialLogin && (
                <>
                  <div className="relative my-6">
                    <Separator />
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                      {t('orContinueWith')}
                    </span>
                  </div>
                
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('google')}
                      disabled={isLoading}
                    >
                      Google
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleSocialLogin('facebook')}
                      disabled={isLoading}
                    >
                      Facebook
                    </Button>
                  </div>
                </>
              )}
              
              <div className="mt-6 text-center">
                <span className="text-sm text-gray-500">
                  {t('dontHaveAccount')}{' '}
                  <Link 
                    to="/register"
                    className="text-blue-600 hover:underline"
                  >
                    {t('register')}
                  </Link>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
