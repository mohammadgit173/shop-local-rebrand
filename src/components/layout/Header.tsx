
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { storeConfig } from '@/config/storeConfig';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { cart, isAuthenticated } = useApp();
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === 'ar' ? 'right' : 'left'} className="w-[75%] sm:max-w-md">
                <div className="flex flex-col mt-8 space-y-5">
                  <Button 
                    variant="ghost" 
                    className="justify-start text-lg h-12"
                    onClick={() => navigate('/')}
                  >
                    {t('home')}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-lg h-12"
                    onClick={() => navigate('/categories')}
                  >
                    {t('categories')}
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="justify-start text-lg h-12"
                    onClick={() => navigate('/orders')}
                  >
                    {t('orders')}
                  </Button>
                  <div className="mt-4">
                    <LanguageSwitcher />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <img 
              src={storeConfig.logo} 
              alt={storeConfig.name} 
              className={isMobile ? "h-8 w-auto" : "h-10 w-auto"}
            />
            <span className="ml-2 text-xl font-bold text-brand-dark hidden md:block">
              {language === 'en' ? storeConfig.name : 'شامي للتسوق'}
            </span>
          </div>

          {/* Navigation for desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
            >
              {t('home')}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/categories')}
            >
              {t('categories')}
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/orders')}
            >
              {t('orders')}
            </Button>
          </nav>

          {/* Actions */}
          <div className={cn("flex items-center", language === 'ar' ? "space-x-reverse" : "space-x-1")}>
            <Button 
              variant="ghost" 
              size="icon"
              className="h-10 w-10"
              onClick={() => navigate('/')}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className="relative h-10 w-10"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              {cart.items.length > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 bg-brand-primary text-brand-dark"
                  variant="secondary"
                >
                  {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="icon"
              className="h-10 w-10"
              onClick={() => navigate(isAuthenticated ? '/user/profile' : '/login')}
            >
              <User className="h-5 w-5" />
            </Button>

            <div className="hidden md:block ml-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
