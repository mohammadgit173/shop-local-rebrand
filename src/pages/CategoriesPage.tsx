
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { categories } from '@/data/mockData';
import CategoryList from '@/components/products/CategoryList';

const CategoriesPage = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">{t('allCategories')}</h1>
        <CategoryList categories={categories} />
      </div>
    </Layout>
  );
};

export default CategoriesPage;
