import React from 'react';
import CategoryCard from './CategoryCard';
import type { Database } from '@/integrations/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'] & {
  image_url: string;
};


interface CategoryListProps {
  categories: Category[];
  title?: string;
}

const CategoryList = ({ categories, title }: CategoryListProps) => {
  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
