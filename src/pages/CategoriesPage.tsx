
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/mockData';
import CategoryList from '@/components/products/CategoryList';
import { useIsMobile } from '@/hooks/use-mobile';

const CategoriesPage = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className={`container mx-auto px-4 ${isMobile ? 'py-4' : 'py-6'}`}>
        <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold mb-6`}>{t('allCategories')}</h1>
        <CategoryList categories={categories} />
      </div>
    </Layout>
  );
};

export default CategoriesPage;
