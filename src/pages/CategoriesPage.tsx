
import React from "react";
import { Link } from "react-router-dom";
import { getCategories, products } from "@/data/products";

const CategoriesPage: React.FC = () => {
  const categories = getCategories();
  
  // Create a map of categories with a sample product image
  const categoryImages = categories.reduce((acc, category) => {
    const product = products.find(p => p.category === category);
    acc[category] = product ? product.image : '';
    return acc;
  }, {} as Record<string, string>);
  
  // Get product count per category
  const categoryCounts = categories.reduce((acc, category) => {
    const count = products.filter(p => p.category === category).length;
    acc[category] = count;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/shop?category=${category}`}
            className="group block"
          >
            <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm transition-all hover:shadow-md">
              <img
                src={categoryImages[category]}
                alt={category}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h2 className="text-xl font-bold text-white">{category}</h2>
                <p className="text-white text-sm mt-1">
                  {categoryCounts[category]} {categoryCounts[category] === 1 ? 'Product' : 'Products'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Collections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Price-based collections */}
          <Link
            to="/shop?maxPrice=50"
            className="group relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
              alt="Under $50"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all group-hover:bg-opacity-50">
              <h3 className="text-white text-2xl font-bold">Under $50</h3>
            </div>
          </Link>
          
          <Link
            to="/shop?minPrice=100"
            className="group relative aspect-video overflow-hidden rounded-lg bg-gray-100 shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGx1eHVyeXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Premium Collection"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all group-hover:bg-opacity-50">
              <h3 className="text-white text-2xl font-bold">Premium Collection</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
