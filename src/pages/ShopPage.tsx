
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/lib/utils";
import { productAPI } from "@/lib/api";
import { toast } from "@/components/ui/sonner";
import { Loader } from "lucide-react";

const ShopPage: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [categories, setCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  
  // Fetch products using React Query
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: () => productAPI.getAll(),
    onSuccess: (data) => {
      setFilteredProducts(data);
      
      // Extract categories
      const uniqueCategories = [...new Set(data.map(product => product.category))];
      setCategories(["all", ...uniqueCategories]);
      
      // Find max price
      const highestPrice = Math.max(...data.map(product => product.price));
      setMaxPrice(highestPrice);
      setPriceRange([0, highestPrice]);
    },
    onError: (error) => {
      toast.error("Failed to load products");
      console.error("Products fetch error:", error);
    }
  });
  
  // Apply filters when any filter criteria changes
  useEffect(() => {
    if (!products) return;
    
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }
    
    // Apply price filter
    result = result.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortBy === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-a-z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-z-a") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, sortBy, products]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };
  
  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setPriceRange([0, maxPrice]);
    setSortBy("default");
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-8 w-8 animate-spin mx-auto mb-4 text-brand-purple" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Failed to load products</h2>
        <p className="text-gray-600 mb-8">Please try again later</p>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop All Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Filters */}
        <div className="space-y-6 md:sticky md:top-24 md:self-start">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-medium text-lg mb-4">Filter Products</h2>
            
            {/* Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </form>
            
            {/* Categories */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Category</h3>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <Slider
                defaultValue={[0, maxPrice]}
                min={0}
                max={maxPrice}
                step={5}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={setPriceRange as (value: number[]) => void}
                className="mb-2"
              />
              <div className="flex justify-between text-sm">
                <span>{formatPrice(priceRange[0])}</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>
            
            {/* Sort By */}
            <div className="mb-4">
              <h3 className="font-medium mb-2">Sort By</h3>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                  <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                  <SelectItem value="name-z-a">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Reset Button */}
            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>
        
        {/* Product Grid */}
        <div>
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {filteredProducts.length} {products ? `of ${products.length}` : ""} products
            </p>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <h2 className="text-xl font-medium mb-2">No products found</h2>
              <p className="text-gray-600 mb-4">Try adjusting your filters</p>
              <Button onClick={handleReset}>Reset Filters</Button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
