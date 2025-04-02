import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import ProductList from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CategoryList from '@/components/products/CategoryList';
import type { Database } from '@/integrations/supabase/types';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  type Category = Database['public']['Tables']['categories']['Row'] & { image_url: string };
  type Product = Database['public']['Tables']['products']['Row'] & {
    image_urls: string[];
  };  
  type ProductImage = Database['public']['Tables']['product_images']['Row'];

  const [category, setCategory] = useState<Category | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [relatedCategoryResults, setRelatedCategoryResults] = useState<Category[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data: catData } = await supabase.from('categories').select('*');
      const enrichedCategories = (catData ?? []).map((cat) => {
        const { data } = supabase.storage.from('category-images').getPublicUrl(cat.image_path);
        return { ...cat, image_url: data?.publicUrl || '' };
      });

      const currentCategory = enrichedCategories.find(c => c.id === id) || null;
      setCategory(currentCategory);
      setAllCategories(enrichedCategories);

      const { data: prodData } = await supabase.from('products').select('*, product_images(*)').eq('category_id', id);
      const productsWithImages = (prodData ?? []).map((product) => {
        const image_urls = (product.product_images ?? []).map((img: ProductImage) => {
          const { data } = supabase.storage.from('product-images').getPublicUrl(img.path);
          return data?.publicUrl || '';
        });
        return { ...product, image_urls };
      });
      

      setCategoryProducts(productsWithImages);
    };

    fetchData();
  }, [id]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();

    const filteredProducts = categoryProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.name_ar?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.description_ar?.toLowerCase().includes(query)
      );
    });

    const filteredCategories = allCategories.filter(cat => {
      if (cat.id === id) return false;
      return (
        cat.name.toLowerCase().includes(query) ||
        cat.name_ar?.toLowerCase().includes(query)
      );
    });

    setSearchResults(filteredProducts);
    setRelatedCategoryResults(filteredCategories);
    setShowSearchResults(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">{t('categoryNotFound')}</h1>
          <Button onClick={() => navigate('/categories')}>{t('backToCategories')}</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">
            {language === 'en' ? category.name : category.name_ar || category.name}
          </h1>
        </div>

        <form onSubmit={handleSearch} className="relative mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder={`${t('searchIn')} ${language === 'en' ? category.name : category.name_ar || category.name}`}
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

        {showSearchResults ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  {searchResults.length + relatedCategoryResults.length} {t('resultsFound')} "{searchQuery}"
                </p>
                <Button variant="ghost" onClick={clearSearch}>
                  {t('backToProducts')}
                </Button>
              </div>
            </div>

            {searchResults.length > 0 && (
              <section className="py-4">
                <h2 className="text-xl font-bold mb-4">{t('products')}</h2>
                <ProductList products={searchResults} />
              </section>
            )}

            {relatedCategoryResults.length > 0 && (
              <section className="py-4">
                <h2 className="text-xl font-bold mb-4">{t('relatedCategories')}</h2>
                <CategoryList categories={relatedCategoryResults} />
              </section>
            )}

            {searchResults.length === 0 && relatedCategoryResults.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">{t('noResultsFound')}</p>
              </div>
            )}
          </>
        ) : (
          <>
            {categoryProducts.length > 0 ? (
              <ProductList products={categoryProducts} />
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">{t('noProductsInCategory')}</p>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
