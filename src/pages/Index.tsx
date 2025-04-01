
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories, featuredProducts, newProducts, saleProducts } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import CategoryList from '@/components/products/CategoryList';
import ProductList from '@/components/products/ProductList';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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
        <div 
          className="relative flex items-center border rounded-lg p-3 bg-white shadow-sm cursor-pointer"
          onClick={() => navigate('/search')}
        >
          <Search className="h-5 w-5 text-gray-400 mr-2" />
          <span className="text-gray-400">{t('searchForProducts')}</span>
        </div>

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
      </div>
    </Layout>
  );
};

export default Index;
