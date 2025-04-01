
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { getProductById, getCategoryById } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Heart
} from 'lucide-react';
import { storeConfig } from '@/config/storeConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { addToCart, addToWishlist, wishlist } = useApp();
  
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(id) : null;
  const category = product ? getCategoryById(product.category) : null;
  
  const isWishlisted = wishlist.some(item => item.product.id === id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('productNotFound')}</h1>
          <Button onClick={() => navigate('/')}>{t('backToHome')}</Button>
        </div>
      </Layout>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const handleAddToWishlist = () => {
    addToWishlist(product);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const formatPrice = (price: number) => {
    return `${storeConfig.currencySymbol} ${price.toLocaleString()}`;
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 pb-24">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="mb-6">
          <div className="rounded-lg overflow-hidden bg-white shadow-sm mb-4">
            <img 
              src={product.images[0]} 
              alt={language === 'en' ? product.name : product.nameAr || product.name}
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">
            {language === 'en' ? product.name : product.nameAr || product.name}
          </h1>
          
          <div className="flex items-center mb-4">
            {category && (
              <span 
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                {language === 'en' ? category.name : category.nameAr || category.name}
              </span>
            )}
          </div>
          
          <div className="flex items-baseline mb-4">
            {product.salePrice ? (
              <>
                <span className="text-2xl font-bold mr-2">{formatPrice(product.salePrice)}</span>
                <span className="text-gray-500 line-through">{formatPrice(product.price)}</span>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                  {Math.round((1 - product.salePrice / product.price) * 100)}% {t('off')}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            )}
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">{t('unit')}: {product.unit}</p>
            <div className="flex items-center">
              <span className={cn(
                "text-sm font-medium px-2 py-0.5 rounded",
                product.inStock 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              )}>
                {product.inStock ? t('inStock') : t('outOfStock')}
              </span>
            </div>
          </div>
          
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="description">{t('description')}</TabsTrigger>
              <TabsTrigger value="details">{t('details')}</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <p className="text-gray-700">
                {language === 'en' ? product.description : product.descriptionAr || product.description}
              </p>
            </TabsContent>
            <TabsContent value="details" className="py-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">{t('category')}</span>
                  <span>{language === 'en' ? category?.name : category?.nameAr || category?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">{t('sku')}</span>
                  <span>{product.id}</span>
                </div>
                {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">{key}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Sticky bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 z-40 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button 
              type="button" 
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <Button 
              type="button" 
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full", 
                isWishlisted && "text-red-500 border-red-500"
              )}
              onClick={handleAddToWishlist}
            >
              <Heart className={cn("h-5 w-5", isWishlisted && "fill-red-500")} />
            </Button>
            
            <Button
              className="bg-brand-primary text-brand-dark hover:bg-brand-accent space-x-2"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>{t('addToCart')}</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
