
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Home, Search, ShoppingCart, User, Menu } from 'lucide-react';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => navigate('/')}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 mobile-touch-target",
            isActive('/') ? "text-brand-primary" : "text-gray-500"
          )}
        >
          <Home className="h-6 w-6 mb-0.5" />
          <span className="text-xs font-medium">{t('home')}</span>
        </button>

        <button
          onClick={() => navigate('/search')}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 mobile-touch-target",
            isActive('/search') ? "text-brand-primary" : "text-gray-500"
          )}
        >
          <Search className="h-6 w-6 mb-0.5" />
          <span className="text-xs font-medium">{t('search')}</span>
        </button>

        <button
          onClick={() => navigate('/categories')}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 mobile-touch-target",
            isActive('/categories') ? "text-brand-primary" : "text-gray-500"
          )}
        >
          <Menu className="h-6 w-6 mb-0.5" />
          <span className="text-xs font-medium">{t('categories')}</span>
        </button>

        <button
          onClick={() => navigate('/cart')}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 mobile-touch-target",
            isActive('/cart') ? "text-brand-primary" : "text-gray-500"
          )}
        >
          <ShoppingCart className="h-6 w-6 mb-0.5" />
          <span className="text-xs font-medium">{t('cart')}</span>
        </button>

        <button
          onClick={() => navigate('/user')}
          className={cn(
            "flex flex-col items-center justify-center flex-1 py-1 mobile-touch-target",
            isActive('/user') ? "text-brand-primary" : "text-gray-500"
          )}
        >
          <User className="h-6 w-6 mb-0.5" />
          <span className="text-xs font-medium">{t('account')}</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
