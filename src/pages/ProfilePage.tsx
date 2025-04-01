
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getOrdersByUserId } from '@/data/mockData';
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, isAuthenticated, logout } = useApp();
  
  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }
  
  const orders = getOrdersByUserId(user.id);
  const userInitials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-8">
          <Avatar className="h-16 w-16 mr-4">
            <AvatarFallback className="bg-brand-primary text-brand-dark text-xl">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <Card className="cursor-pointer" onClick={() => navigate('/profile/edit')}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3 text-gray-500" />
                <span>{t('myProfile')}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer" onClick={() => navigate('/orders')}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-3 text-gray-500" />
                <span>{t('myOrders')}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  {orders.length} {t('orders')}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer" onClick={() => navigate('/addresses')}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-gray-500" />
                <span>{t('myAddresses')}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  {user.addresses.length} {t('addresses')}
                </span>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer" onClick={() => navigate('/wishlist')}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Heart className="h-5 w-5 mr-3 text-gray-500" />
                <span>{t('wishlist')}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
          
          <Card className="cursor-pointer" onClick={() => navigate('/settings')}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-gray-500" />
                <span>{t('settings')}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </CardContent>
          </Card>
          
          <Button
            variant="outline"
            className="w-full mt-6 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            {t('logout')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
