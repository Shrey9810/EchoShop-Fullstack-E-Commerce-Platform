
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById, products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import ProductGrid from "@/components/ProductGrid";
import { formatPrice } from "@/lib/utils";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState(id ? getProductById(id) : null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addItem } = useCart();
  
  useEffect(() => {
    // Set product based on URL param
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      // Get related products (same category)
      if (foundProduct) {
        const related = products
          .filter(
            (p) => p.category === foundProduct.category && p.id !== foundProduct.id
          )
          .slice(0, 4);
        setRelatedProducts(related);
      }
    }
    
    // Reset quantity when product changes
    setQuantity(1);
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [id]);
  
  const increaseQuantity = () => {
    if (product && quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/shop" className="text-brand-purple hover:underline">
          ← Back to Shop
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          
          <div className="mb-4">
            <span className="inline-block bg-brand-purple-light text-brand-purple-dark text-sm px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          
          <div className="text-2xl font-bold text-gray-900 mb-4">
            {formatPrice(product.price)}
          </div>
          
          <p className="text-gray-700 mb-6">{product.description}</p>
          
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-1">Availability:</div>
            {product.inventory > 0 ? (
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-gray-800">
                  In Stock ({product.inventory} available)
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                <span className="text-gray-800">Out of Stock</span>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="h-10 w-10 rounded-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.inventory}
                  className="h-10 w-10 rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                disabled={product.inventory === 0}
                className="bg-brand-purple hover:bg-brand-purple-dark flex-1"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You May Also Like
          </h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
