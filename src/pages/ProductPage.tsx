import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, Minus, ShoppingCart, Heart } from "lucide-react";
import { storeConfig } from "@/config/storeConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"] & {
  image_urls: string[];
};

type Category = Database["public"]["Tables"]["categories"]["Row"];
type ProductImage = Database["public"]["Tables"]["product_images"]["Row"];

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const { addToCart, addToWishlist, wishlist } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const isWishlisted = wishlist.some((item) => item.product.id === id);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const { data: prodData } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("id", id)
        .single();

      if (!prodData) {
        setLoading(false);
        return;
      }

      const image_urls = (prodData.product_images ?? []).map(
        (img: ProductImage) => {
          const { data } = supabase.storage
            .from("product-images")
            .getPublicUrl(img.path);
          return data?.publicUrl || "";
        }
      );

      const fullProduct: Product = { ...prodData, image_urls };
      setProduct(fullProduct);

      const { data: categoryData } = await supabase
        .from("categories")
        .select("*")
        .eq("id", prodData.category_id)
        .single();

      setCategory(categoryData ?? null);
      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleAddToCart = () => {
    if (product)
      addToCart({ ...product, images: product.image_urls }, quantity);
  };

  const handleAddToWishlist = () => {
    if (product) addToWishlist({ ...product, images: product.image_urls });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    quantity > 1 && setQuantity((prev) => prev - 1);

  const formatPrice = (price: number) =>
    `${storeConfig.currencySymbol} ${price.toLocaleString()}`;

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 text-center">
          <p className="text-gray-500">{t("loading")}...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("productNotFound")}</h1>
          <Button onClick={() => navigate("/")}>{t("backToHome")}</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 pb-24">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="mb-6">
          <div className="rounded-lg overflow-hidden bg-white shadow-sm mb-4">
            <img
              src={product.image_urls[0] || "/placeholder.png"}
              alt={
                language === "en"
                  ? product.name
                  : product.name_ar || product.name
              }
              className="w-full h-64 md:h-80 object-cover"
            />
          </div>

          <h1 className="text-2xl font-bold mb-2">
            {language === "en" ? product.name : product.name_ar || product.name}
          </h1>

          <div className="flex items-center mb-4">
            {category && (
              <span
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => navigate(`/category/${category.id}`)}
              >
                {language === "en"
                  ? category.name
                  : category.name_ar || category.name}
              </span>
            )}
          </div>

          <div className="flex items-baseline mb-4">
            {product.sale_price ? (
              <>
                <span className="text-2xl font-bold mr-2">
                  {formatPrice(product.sale_price)}
                </span>
                <span className="text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                  {Math.round((1 - product.sale_price / product.price) * 100)}%{" "}
                  {t("off")}
                </span>
              </>
            ) : (
              <span className="text-2xl font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-1">
              {t("unit")}: {product.unit}
            </p>
            <div className="flex items-center">
              <span
                className={cn(
                  "text-sm font-medium px-2 py-0.5 rounded",
                  product.in_stock
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                )}
              >
                {product.in_stock ? t("inStock") : t("outOfStock")}
              </span>
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="description">{t("description")}</TabsTrigger>
              <TabsTrigger value="details">{t("details")}</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="py-4">
              <p className="text-gray-700">
                {language === "en"
                  ? product.description
                  : product.description_ar || product.description}
              </p>
            </TabsContent>
            <TabsContent value="details" className="py-4">
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">{t("category")}</span>
                  <span>
                    {language === "en"
                      ? category?.name
                      : category?.name_ar || category?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">{t("sku")}</span>
                  <span>{product.id}</span>
                </div>
            
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3 z-40 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center font-medium">{quantity}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full",
                isWishlisted && "text-red-500 border-red-500"
              )}
              onClick={handleAddToWishlist}
            >
              <Heart
                className={cn("h-5 w-5", isWishlisted && "fill-red-500")}
              />
            </Button>

            <Button
              className="bg-brand-primary text-brand-dark hover:bg-brand-accent space-x-2"
              disabled={!product.in_stock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>{t("addToCart")}</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
