
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      
      // Mock order data for demo
      if (id === "ord-001") {
        setOrder({
          id: "ord-001",
          userId: user?.id || "",
          items: [
            {
              product: {
                id: "1",
                name: "Wireless Bluetooth Headphones",
                description: "Experience premium sound quality with these comfortable over-ear headphones featuring active noise cancellation.",
                price: 149.99,
                category: "Electronics",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
                inventory: 15
              },
              quantity: 1
            },
            {
              product: {
                id: "5",
                name: "Stainless Steel Water Bottle",
                description: "Stay hydrated with this insulated bottle that keeps your drinks cold for 24 hours or hot for 12 hours.",
                price: 29.99,
                category: "Kitchen",
                image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2F0ZXIlMjBib3R0bGV8ZW58MHx8MHx8fDA%3D",
                inventory: 25
              },
              quantity: 2
            }
          ],
          total: 209.97,
          status: "completed",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
        });
      } else if (id === "ord-002") {
        setOrder({
          id: "ord-002",
          userId: user?.id || "",
          items: [
            {
              product: {
                id: "3",
                name: "Ergonomic Office Chair",
                description: "Work comfortably with this adjustable office chair featuring lumbar support and breathable mesh material.",
                price: 189.50,
                category: "Furniture",
                image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D",
                inventory: 12
              },
              quantity: 1
            }
          ],
          total: 189.50,
          status: "completed",
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
        });
      } else if (id === "ord-003") {
        setOrder({
          id: "ord-003",
          userId: user?.id || "",
          items: [
            {
              product: {
                id: "8",
                name: "Mechanical Keyboard",
                description: "Enhance your typing experience with this tactile mechanical keyboard featuring customizable RGB backlighting.",
                price: 129.99,
                category: "Electronics",
                image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2V5Ym9hcmR8ZW58MHx8MHx8fDA%3D",
                inventory: 10
              },
              quantity: 1
            }
          ],
          total: 129.99,
          status: "pending",
          createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
        });
      } else {
        setOrder(null);
      }
      
      setIsLoading(false);
    };

    if (isAuthenticated) {
      fetchOrder();
    } else {
      setIsLoading(false);
    }
  }, [id, isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-8">
            You need to be logged in to view order details.
          </p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/orders" className="inline-flex items-center text-brand-purple hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
        </Link>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Link to="/orders" className="inline-flex items-center text-brand-purple hover:underline mb-8">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
        </Link>
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-600 mb-8">
            The order you're looking for doesn't exist or you may not have access to view it.
          </p>
          <Button asChild>
            <Link to="/orders">View All Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/orders" className="inline-flex items-center text-brand-purple hover:underline mb-8">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Orders
      </Link>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
                <Badge variant={order.status === "completed" ? "default" : "outline"}>
                  {order.status === "completed" ? "Completed" : "Pending"}
                </Badge>
              </div>
              <p className="text-gray-600">
                Placed on {order.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item.product.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-medium hover:text-brand-purple"
                    >
                      {item.product.name}
                    </Link>
                    <div className="text-sm text-gray-600 mt-1">
                      {item.product.description.substring(0, 100)}...
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{formatPrice(item.product.price)}</div>
                    <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                    <div className="font-medium mt-1">
                      {formatPrice(item.product.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gray-50">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(order.total)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatPrice(order.total * 0.07)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(order.total + order.total * 0.07)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
