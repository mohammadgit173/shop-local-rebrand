
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { storeConfig } from '@/config/storeConfig';

const CartPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const { cart, updateCartItemQuantity, removeFromCart } = useApp();
  
  const formatPrice = (price: number) => {
    return `${storeConfig.currencySymbol} ${price.toLocaleString()}`;
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (cart.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
            <h1 className="text-2xl font-bold">{t('emptyCart')}</h1>
            <p className="text-gray-500 mb-4">{t('emptyCartMessage')}</p>
            <Button onClick={() => navigate('/')}>{t('startShopping')}</Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 pb-32">
        <h1 className="text-2xl font-bold mb-6">{t('yourCart')}</h1>
        
        <div className="space-y-4 mb-8">
          {cart.items.map((item) => (
            <Card key={item.product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-start p-4">
                  <div 
                    className="w-20 h-20 rounded overflow-hidden flex-shrink-0 cursor-pointer"
                    onClick={() => navigate(`/product/${item.product.id}`)}
                  >
                    <img 
                      src={item.product.images[0]} 
                      alt={language === 'en' ? item.product.name : item.product.name_ar || item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h3 
                      className="font-medium cursor-pointer"
                      onClick={() => navigate(`/product/${item.product.id}`)}
                    >
                      {language === 'en' ? item.product.name : item.product.name_ar || item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{item.product.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        {item.product.sale_price ? (
                          <div className="flex flex-col">
                            <span className="font-bold">
                              {formatPrice(item.product.sale_price * item.quantity)}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                          </div>
                        ) : (
                          <span className="font-bold">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => updateCartItemQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => updateCartItemQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Sticky checkout summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-4 z-40">
        <div className="container mx-auto">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">{t('subtotal')}</span>
              <span>{formatPrice(cart.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">{t('delivery')}</span>
              <span>
                {cart.delivery_fee > 0 
                  ? formatPrice(cart.delivery_fee)
                  : t('free')}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>{t('total')}</span>
              <span>{formatPrice(cart.total)}</span>
            </div>
          </div>
          
          <Button 
            className="w-full bg-brand-primary text-brand-dark hover:bg-brand-accent" 
            size="lg"
            onClick={handleCheckout}
          >
            {t('proceedToCheckout')}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
