import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";


type Category = Database['public']['Tables']['categories']['Row'] & {
  image_url: string;
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const imageUrl = category.image_url;

  const handleClick = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <Card
      className="category-card h-full cursor-pointer transition-all hover:scale-[1.02]"
      onClick={handleClick}
    >
      <div className="relative h-40 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={
            language === "en"
              ? category.name
              : category.name_ar || category.name
          }
          className="w-full h-full object-cover transition-transform hover:scale-110"
        />
      </div>

      <CardContent className="p-3 text-center">
        <h3 className="font-medium text-sm line-clamp-2 min-h-[2.5rem]">
          {language === "en"
            ? category.name
            : category.name_ar || category.name}
        </h3>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
