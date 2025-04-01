
import React from 'react';
import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  title?: string;
}

const ProductList = ({ products, title }: ProductListProps) => {
  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl font-bold">{title}</h2>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
