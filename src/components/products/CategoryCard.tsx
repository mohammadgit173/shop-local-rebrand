
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const handleClick = () => {
    navigate(`/category/${category.id}`);
  };
  
  return (
    <Card 
      className="category-item cursor-pointer hover:shadow-md transition-shadow"
      onClick={handleClick}
    >
      <CardContent className="flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 rounded-full bg-brand-secondary flex items-center justify-center mb-2">
          <img 
            src={category.icon} 
            alt={language === 'en' ? category.name : category.nameAr || category.name}
            className="w-10 h-10 object-contain"
          />
        </div>
        <h3 className="text-sm font-medium text-center">
          {language === 'en' ? category.name : category.nameAr || category.name}
        </h3>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
