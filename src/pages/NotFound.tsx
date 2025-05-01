
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-brand-purple mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="space-y-3">
          <Button asChild className="w-full bg-brand-purple hover:bg-brand-purple-dark">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
