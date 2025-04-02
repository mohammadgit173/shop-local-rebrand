import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import CategoryList from '@/components/products/CategoryList';
import ProductList from '@/components/products/ProductList';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

type Category = Database['public']['Tables']['categories']['Row'] & {
  image_url: string;
};

type Product = Database['public']['Tables']['products']['Row'] & {
  image_urls: string[];
};

type ProductImage = Database['public']['Tables']['product_images']['Row'];

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [categoryResults, setCategoryResults] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const { data: catData, error: catError } = await supabase.from('categories').select('*');
      const categoriesWithUrls = (catData ?? []).map((cat) => {
        const { data } = supabase.storage.from('category-images').getPublicUrl(cat.image_path);
        return { ...cat, image_url: data?.publicUrl || '' };
      });
      setCategories(categoriesWithUrls);

      const { data: prodData, error: prodError } = await supabase
        .from('products')
        .select('*, product_images(*)');

      if (catError || prodError) {
        console.error('Error loading data:', catError || prodError);
        setLoading(false);
        return;
      }

      const productsWithImages: Product[] = (prodData ?? []).map((product) => {
        const image_urls = (product.product_images ?? []).map((img: ProductImage) => {
          const { data } = supabase.storage.from('product-images').getPublicUrl(img.path);
          return data?.publicUrl || '';
        });

        return { ...product, image_urls };
      });

      setProducts(productsWithImages);
      setLoading(false);
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

  const featuredProducts = products.filter((p) => p.featured);
  const saleProducts = products.filter((p) => p.sale_price);
  const newProducts = products.filter((p) => p.new);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <div className="rounded-xl bg-gradient-to-r from-brand-secondary to-brand-primary p-6 mb-8">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold text-brand-dark mb-3">{t('appName')}</h1>
            <p className="text-brand-dark mb-4">{t('freshGroceriesDelivered')}</p>
            <Button
              className="bg-white text-brand-dark hover:bg-gray-100"
              onClick={() => navigate('/categories')}
            >
              {t('shopNow')}
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12 w-full shadow-sm"
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
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

        {loading ? (
          <p className="text-center text-gray-400">{t('loading')}...</p>
        ) : showSearchResults ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  {searchResults.length + categoryResults.length} {t('resultsFound')} "{searchQuery}"
                </p>
                <Button variant="ghost" onClick={clearSearch}>
                  {t('backToHome')}
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
          <>
            {/* Categories */}
            <section className="py-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{t('categories')}</h2>
                <Button
                  variant="link"
                  className="text-brand-dark"
                  onClick={() => navigate('/categories')}
                >
                  {t('seeAll')}
                </Button>
              </div>
              <CategoryList categories={categories.slice(0, 6)} />
            </section>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
              <section className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{t('featuredProducts')}</h2>
                  <Button
                    variant="link"
                    className="text-brand-dark"
                    onClick={() => navigate('/featured')}
                  >
                    {t('seeAll')}
                  </Button>
                </div>
                <ProductList products={featuredProducts.slice(0, 4)} />
              </section>
            )}

            {/* Products on Sale */}
            {saleProducts.length > 0 && (
              <section className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{t('onSale')}</h2>
                  <Button
                    variant="link"
                    className="text-brand-dark"
                    onClick={() => navigate('/sale')}
                  >
                    {t('seeAll')}
                  </Button>
                </div>
                <ProductList products={saleProducts.slice(0, 4)} />
              </section>
            )}

            {/* New Products */}
            {newProducts.length > 0 && (
              <section className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{t('newArrivals')}</h2>
                  <Button
                    variant="link"
                    className="text-brand-dark"
                    onClick={() => navigate('/new')}
                  >
                    {t('seeAll')}
                  </Button>
                </div>
                <ProductList products={newProducts.slice(0, 4)} />
              </section>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;