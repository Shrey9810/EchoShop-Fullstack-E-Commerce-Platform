
import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag
            className="mx-auto h-16 w-16 text-gray-400 mb-4"
            strokeWidth={1.5}
          />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.product.id} className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="aspect-square w-24 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-grow">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-medium text-gray-900 hover:text-brand-purple"
                      >
                        {item.product.name}
                      </Link>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.product.category}
                      </div>
                      <div className="font-medium mt-1">
                        {formatPrice(item.product.price)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 sm:mt-0">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="h-8 w-8"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.inventory}
                        className="h-8 w-8"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="text-right font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>

                    <div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="text-gray-600"
                >
                  Clear Cart
                </Button>
                <Button asChild variant="outline">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <Button asChild className="w-full mt-6 bg-brand-purple hover:bg-brand-purple-dark">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
