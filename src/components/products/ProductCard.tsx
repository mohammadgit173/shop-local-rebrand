import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { storeConfig } from '@/config/storeConfig';
import type { Database } from '@/integrations/supabase/types';

type Product = Database['public']['Tables']['products']['Row'] & {
  image_urls: string[];
};


interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { addToCart, addToWishlist, wishlist } = useApp();

  const isWishlisted = wishlist.some(item => item.product.id === product.id);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, images: product.image_urls }, 1);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToWishlist({ ...product, images: product.image_urls });
  };

  const formatPrice = (price: number) => {
    return `${storeConfig.currencySymbol} ${price.toLocaleString()}`;
  };

  return (
    <Card 
      className="product-card h-full cursor-pointer transition-all hover:scale-[1.02]" 
      onClick={handleProductClick}
    >
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <img 
          src={product.image_urls[0]}
          alt={language === 'en' ? product.name : product.name_ar || product.name} 
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
        {product.sale_price && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {Math.round((1 - product.sale_price / product.price) * 100)}% {t('off')}
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-gray-700", 
            isWishlisted && "text-red-500"
          )}
          onClick={handleAddToWishlist}
        >
          <Heart className={cn("h-5 w-5", isWishlisted && "fill-red-500")} />
        </Button>
      </div>

      <CardContent className="p-3">
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
          {language === 'en' ? product.name : product.name_ar || product.name}
        </h3>

        <div className="mt-2 flex items-center justify-between">
          <div className="flex flex-col">
            {product.sale_price ? (
              <>
                <span className="font-bold text-sm">{formatPrice(product.sale_price)}</span>
                <span className="text-gray-500 line-through text-xs">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="font-bold text-sm">{formatPrice(product.price)}</span>
            )}
          </div>

          <Button 
            size="sm"
            variant="outline"
            className="h-8 w-8 rounded-full p-0 bg-brand-primary border-brand-primary hover:bg-brand-accent"
            onClick={handleAddToCart}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
