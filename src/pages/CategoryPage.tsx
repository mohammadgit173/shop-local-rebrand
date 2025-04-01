
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCategoryById, getProductsByCategory, products as allProducts } from '@/data/mockData';
import ProductList from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const category = id ? getCategoryById(id) : null;
  const categoryProducts = id ? getProductsByCategory(id) : [];
  
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
    // Search only within the current category products
    const filtered = categoryProducts.filter(product => {
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
            {language === 'en' ? category.name : category.nameAr || category.name}
          </h1>
        </div>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative mb-6">
          <div className="relative flex items-center">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="search"
              placeholder={`${t('searchIn')} ${language === 'en' ? category.name : category.nameAr || category.name}`}
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
        
        {/* Search Results or Products */}
        {showSearchResults ? (
          <>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <p className="text-gray-500">
                  {searchResults.length} {t('resultsFound')} "{searchQuery}"
                </p>
                <Button variant="ghost" onClick={clearSearch}>
                  {t('backToProducts')}
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
