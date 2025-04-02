import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import CategoryList from '@/components/products/CategoryList';
import ProductList from '@/components/products/ProductList';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Database } from '@/integrations/supabase/types';

const CategoriesPage = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  type Category = Database['public']['Tables']['categories']['Row'] & { image_url: string };
  type Product = Database['public']['Tables']['products']['Row'] & {
    image_urls: string[];
  };
  
  type ProductImage = Database['public']['Tables']['product_images']['Row'];

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [categoryResults, setCategoryResults] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: catData } = await supabase.from('categories').select('*');
      const categoriesWithUrls = (catData ?? []).map((cat) => {
        const { data } = supabase.storage.from('category-images').getPublicUrl(cat.image_path);
        return { ...cat, image_url: data?.publicUrl || '' };
      });
      setCategories(categoriesWithUrls);

      const { data: prodData } = await supabase.from('products').select('*, product_images(*)');
      const productsWithImages = (prodData ?? []).map((product) => {
        const image_urls = (product.product_images ?? []).map((img: ProductImage) => {
          const { data } = supabase.storage.from('product-images').getPublicUrl(img.path);
          return data?.publicUrl || '';
        });
        return { ...product, image_urls };
      });
      
      setProducts(productsWithImages);
    };

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filteredProducts = products.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.name_ar?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.description_ar?.toLowerCase().includes(query)
      );
    });

    const filteredCategories = categories.filter(category => {
      return (
        category.name.toLowerCase().includes(query) ||
        category.name_ar?.toLowerCase().includes(query)
      );
    });

    setSearchResults(filteredProducts);
    setCategoryResults(filteredCategories);
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 pb-safe">
        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold my-4`}>{t('allCategories')}</h1>

        <form onSubmit={handleSearch} className="sticky top-0 z-10 bg-background pt-2 pb-4">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 w-full shadow-sm text-base"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 mobile-touch-target"
                onClick={clearSearch}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <Button type="submit" className="hidden">
            {t('search')}
          </Button>
        </form>

        {showSearchResults ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  {searchResults.length + categoryResults.length} {t('resultsFound')} "{searchQuery}"
                </p>
                <Button
                  variant="ghost"
                  onClick={clearSearch}
                  className="h-10 mobile-touch-target"
                >
                  {t('backToCategories')}
                </Button>
              </div>
            </div>

            {categoryResults.length > 0 && (
              <section className="py-4">
                <h2 className="text-xl font-bold mb-4">{t('categories')}</h2>
                <CategoryList categories={categoryResults} />
              </section>
            )}

            {searchResults.length > 0 && (
              <section className="py-4">
                <h2 className="text-xl font-bold mb-4">{t('products')}</h2>
                <ProductList products={searchResults} />
              </section>
            )}

            {searchResults.length === 0 && categoryResults.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">{t('noResultsFound')}</p>
              </div>
            )}
          </>
        ) : (
          <CategoryList categories={categories} />
        )}
      </div>
    </Layout>
  );
};

export default CategoriesPage;