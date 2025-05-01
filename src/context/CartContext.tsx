
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { Product, CartItem } from "../types";
import { toast } from "@/components/ui/sonner";
import { cartAPI } from "@/lib/api";
import { useAuth } from "./AuthContext";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  syncWithServer: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Sync cart with backend when user logs in
  useEffect(() => {
    if (isAuthenticated && items.length > 0) {
      syncWithServer();
    }
  }, [isAuthenticated]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Sync cart with server (for logged-in users)
  const syncWithServer = async () => {
    if (!isAuthenticated) return;
    
    try {
      setIsLoading(true);
      await cartAPI.sync(items);
    } catch (error) {
      console.error("Failed to sync cart with server:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addItem = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      // Check if product is already in cart
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // Update quantity if product already exists in cart
        const newQuantity = existingItem.quantity + quantity;
        
        if (newQuantity <= product.inventory) {
          toast.success(`Updated ${product.name} quantity to ${newQuantity}`);
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          );
        } else {
          toast.error(`Sorry, only ${product.inventory} in stock`);
          return prevItems;
        }
      } else {
        // Add new item if product isn't in cart yet
        if (quantity <= product.inventory) {
          toast.success(`Added ${product.name} to cart`);
          return [...prevItems, { product, quantity }];
        } else {
          toast.error(`Sorry, only ${product.inventory} in stock`);
          return prevItems;
        }
      }
    });

    // Sync with server if authenticated
    if (isAuthenticated) {
      syncWithServer();
    }
  };

  const removeItem = (productId: string) => {
    setItems((prevItems) => {
      const item = prevItems.find(item => item.product.id === productId);
      if (item) {
        toast.info(`Removed ${item.product.name} from cart`);
      }
      return prevItems.filter((item) => item.product.id !== productId);
    });

    // Sync with server if authenticated
    if (isAuthenticated) {
      syncWithServer();
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => {
      const item = prevItems.find(item => item.product.id === productId);
      
      if (!item) return prevItems;
      
      if (quantity <= 0) {
        toast.info(`Removed ${item.product.name} from cart`);
        return prevItems.filter((item) => item.product.id !== productId);
      }

      if (quantity > item.product.inventory) {
        toast.error(`Sorry, only ${item.product.inventory} in stock`);
        return prevItems;
      }

      return prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });

    // Sync with server if authenticated
    if (isAuthenticated) {
      syncWithServer();
    }
  };

  const clearCart = () => {
    setItems([]);
    toast.info("Cart cleared");

    // Sync with server if authenticated
    if (isAuthenticated) {
      syncWithServer();
    }
  };

  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of all items in cart
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoading,
        syncWithServer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
