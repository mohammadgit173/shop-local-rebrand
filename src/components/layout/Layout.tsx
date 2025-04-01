
import React from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import { useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout = ({ children, hideNav = false }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const isAuthPage = location.pathname.includes('/login') || 
                    location.pathname.includes('/register') || 
                    location.pathname.includes('/forgot-password');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && !hideNav && <Header />}
      <main className={`flex-grow ${isMobile ? 'pb-20' : 'pb-0'}`}>
        {children}
      </main>
      {!isAuthPage && !hideNav && <BottomNavigation />}
    </div>
  );
};

export default Layout;
