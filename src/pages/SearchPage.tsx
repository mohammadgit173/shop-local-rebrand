
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { products as allProducts } from '@/data/mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductList from '@/components/products/ProductList';
import { Search, X } from 'lucide-react';

const SearchPage = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(allProducts);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults(allProducts);
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
  };
  
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults(allProducts);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">{t('search')}</h1>
        
        <form onSubmit={handleSearch} className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 h-12"
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
        
        {searchQuery && (
          <div className="mb-4">
            <p className="text-gray-500">
              {searchResults.length} {t('resultsFound')} "{searchQuery}"
            </p>
          </div>
        )}
        
        {searchResults.length > 0 ? (
          <ProductList products={searchResults} />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">{t('noProductsFound')}</p>
            <Button onClick={() => navigate('/')}>{t('backToHome')}</Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
