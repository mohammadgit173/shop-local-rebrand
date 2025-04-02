
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories, products } from '@/data/mockData';
import CategoryList from '@/components/products/CategoryList';
import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/products/ProductList';

const CategoriesPage = () => {
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
  const [categoryResults, setCategoryResults] = useState<typeof categories>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    
    // Search products
    const filteredProducts = products.filter(product => {
      const matchName = product.name.toLowerCase().includes(query);
      const matchNameAr = product.nameAr?.toLowerCase().includes(query) || false;
      const matchDescription = product.description.toLowerCase().includes(query);
      const matchDescriptionAr = product.descriptionAr?.toLowerCase().includes(query) || false;
      
      return matchName || matchNameAr || matchDescription || matchDescriptionAr;
    });
    
    // Search categories - since we're on the categories page, prioritize category search
    const filteredCategories = categories.filter(category => {
      const matchName = category.name.toLowerCase().includes(query);
      const matchNameAr = category.nameAr?.toLowerCase().includes(query) || false;
      
      return matchName || matchNameAr;
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
      <div className={`container mx-auto px-4 ${isMobile ? 'py-4' : 'py-6'}`}>
        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`}>{t('allCategories')}</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder={t('searchForCategoriesOrProducts')}
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

        {/* Search Results or Categories */}
        {showSearchResults ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  {searchResults.length + categoryResults.length} {t('resultsFound')} "{searchQuery}"
                </p>
                <Button variant="ghost" onClick={clearSearch}>
                  {t('backToCategories')}
                </Button>
              </div>
            </div>
            
            {/* Category Results - Show these first on the categories page */}
            {categoryResults.length > 0 && (
              <section className="py-4">
                <h2 className="text-xl font-bold mb-4">{t('categories')}</h2>
                <CategoryList categories={categoryResults} />
              </section>
            )}
            
            {/* Product Results */}
            {searchResults.length > 0 && (
              <section className="py-4">
                <h2 className="text-xl font-bold mb-4">{t('products')}</h2>
                <ProductList products={searchResults} />
              </section>
            )}
            
            {/* No Results */}
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
