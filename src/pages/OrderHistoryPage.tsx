
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const OrderHistoryPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching order history
    const fetchOrders = async () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Mock orders for demo
      const mockOrders: Order[] = [
        {
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
        },
        {
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
        },
        {
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
        }
      ];
      
      setOrders(mockOrders);
      setIsLoading(false);
    };

    if (isAuthenticated) {
      fetchOrders();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-8">
            You need to be logged in to view your order history.
          </p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Order History</h1>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm p-8">
          <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet. Start shopping to place your first order!
          </p>
          <Button asChild>
            <Link to="/shop">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">Order #{order.id}</h3>
                      <Badge variant={order.status === "completed" ? "default" : "outline"}>
                        {order.status === "completed" ? "Completed" : "Pending"}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">
                      Placed on {order.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Total: {formatPrice(order.total)}</div>
                    <div className="text-sm text-gray-600">{order.items.length} items</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="divide-y">
                  {order.items.map((item) => (
                    <div key={`${order.id}-${item.product.id}`} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-medium hover:text-brand-purple"
                          >
                            {item.product.name}
                          </Link>
                          <div className="text-sm text-gray-600 mt-1">
                            Quantity: {item.quantity}
                          </div>
                          <div className="mt-1 font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 bg-gray-50">
                <Button asChild variant="outline" size="sm">
                  <Link to={`/order/${order.id}`}>View Order Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
