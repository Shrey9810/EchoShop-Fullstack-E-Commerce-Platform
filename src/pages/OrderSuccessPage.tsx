
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const OrderSuccessPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="w-16 h-16 bg-brand-purple-light rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-brand-purple" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been placed successfully. We'll send you a confirmation
          email with your order details.
        </p>
        <div className="bg-gray-50 rounded-md p-4 mb-6">
          <p className="font-medium mb-1">Order Number</p>
          <p className="text-brand-purple text-lg font-bold">
            #EC{Math.floor(100000 + Math.random() * 900000)}
          </p>
        </div>
        <div className="space-y-4">
          <Button asChild className="w-full bg-brand-purple hover:bg-brand-purple-dark">
            <Link to="/orders">View Order</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
