
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories, featuredProducts, newProducts, saleProducts, products as allProducts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import CategoryList from '@/components/products/CategoryList';
import ProductList from '@/components/products/ProductList';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = allProducts.filter(product => {
      const matchName = product.name.toLowerCase().includes(query);
      const matchNameAr = product.nameAr?.toLowerCase().includes(query) || false;
      const matchDescription = product.description.toLowerCase().includes(query);
      const matchDescriptionAr = product.descriptionAr?.toLowerCase().includes(query) || false;
      
      return matchName || matchNameAr || matchDescription || matchDescriptionAr;
    });
    
    setSearchResults(filtered);
    setShowSearchResults(true);
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setShowSearchResults(false);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <div className="rounded-xl bg-gradient-to-r from-brand-secondary to-brand-primary p-6 mb-8">
          <div className="max-w-md">
            <h1 className="text-3xl font-bold text-brand-dark mb-3">{t('appName')}</h1>
            <p className="text-brand-dark mb-4">
              {t('freshGroceriesDelivered')}
            </p>
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
              placeholder={t('searchForProducts')}
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

        {/* Search Results */}
        {showSearchResults ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  {searchResults.length} {t('resultsFound')} "{searchQuery}"
                </p>
                <Button variant="ghost" onClick={clearSearch}>
                  {t('backToHome')}
                </Button>
              </div>
            </div>
            
            {searchResults.length > 0 ? (
              <ProductList products={searchResults} />
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">{t('noProductsFound')}</p>
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
