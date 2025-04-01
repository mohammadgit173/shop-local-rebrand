
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { getCategoryById, getProductsByCategory } from '@/data/mockData';
import ProductList from '@/components/products/ProductList';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const category = id ? getCategoryById(id) : null;
  const products = id ? getProductsByCategory(id) : [];
  
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
        
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">{t('noProductsInCategory')}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryPage;
