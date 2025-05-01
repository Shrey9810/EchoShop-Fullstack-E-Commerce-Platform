
import React, { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { products, getCategories } from "@/data/products";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 4));
  const [newArrivals, setNewArrivals] = useState(products.slice(4, 8));
  const categories = getCategories();

  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {/* Featured Products */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Button asChild variant="outline">
              <Link to="/shop">View All</Link>
            </Button>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
        
        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/category/${category.toLowerCase()}`}
                className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-square shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-all group-hover:bg-opacity-50">
                  <h3 className="text-white text-xl font-bold">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* New Arrivals */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              New Arrivals
            </h2>
            <Button asChild variant="outline">
              <Link to="/shop">View All</Link>
            </Button>
          </div>
          <ProductGrid products={newArrivals} />
        </div>
        
        {/* Newsletter */}
        <div className="bg-brand-purple-light rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            Stay updated with our latest products, exclusive offers, and promotions.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-purple flex-grow"
            />
            <Button className="bg-brand-purple hover:bg-brand-purple-dark text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
