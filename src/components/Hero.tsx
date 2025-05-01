
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <div className="bg-brand-purple-light py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Shop the Latest <span className="text-brand-purple">Trends</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Discover our curated collection of products that blend style, quality, and affordability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-brand-purple hover:bg-brand-purple-dark">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/categories">Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" 
                    alt="Featured Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden h-32">
                  <img 
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D" 
                    alt="Featured Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden h-32">
                  <img 
                    src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D" 
                    alt="Featured Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden h-48">
                  <img 
                    src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" 
                    alt="Featured Product" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
