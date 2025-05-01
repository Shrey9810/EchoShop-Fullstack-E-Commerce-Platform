
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.inventory > 0) {
      addItem(product, 1);
      toast.success(`${product.name} added to cart`);
    }
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {product.inventory === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-gray-900 group-hover:text-brand-purple transition-colors">
            {product.name}
          </h3>
          <span className="font-bold text-brand-purple">
            {formatPrice(product.price)}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 mb-3">
          {product.category}
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <Button 
          onClick={handleAddToCart}
          disabled={product.inventory === 0}
          variant="outline"
          size="sm" 
          className="w-full hover:bg-brand-purple hover:text-white transition-colors"
        >
          <ShoppingCart className="mr-1 h-4 w-4" />
          {product.inventory > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;
