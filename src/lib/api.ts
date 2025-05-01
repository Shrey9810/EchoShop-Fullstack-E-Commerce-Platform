import { Product, User, Order } from "@/types";

const API_URL = "/api";

// Generic fetch wrapper with error handling
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include', // Send cookies for authentication
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `API request failed: ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Product API
export const productAPI = {
  getAll: () => fetchAPI<Product[]>('/products'),
  getById: (id: string) => fetchAPI<Product>(`/products/${id}`),
  getByCategory: (category: string) => fetchAPI<Product[]>(`/products/category/${category}`),
  search: (query: string) => fetchAPI<Product[]>(`/products/search?q=${query}`),
};

// Auth API
export const authAPI = {
  login: (email: string, password: string) => 
    fetchAPI<{ user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  
  register: (name: string, email: string, password: string) => 
    fetchAPI<{ user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  
  logout: () => fetchAPI<{ success: boolean }>('/auth/logout', { method: 'POST' }),
  
  getCurrentUser: () => fetchAPI<{ user: User | null }>('/auth/me'),
  
  updateProfile: (data: { name: string; email: string }) => 
    fetchAPI<{ user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  updatePassword: (data: { currentPassword: string; newPassword: string }) => 
    fetchAPI<{ success: boolean }>('/auth/password', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Orders API
export const orderAPI = {
  getAll: () => fetchAPI<Order[]>('/orders'),
  getById: (id: string) => fetchAPI<Order>(`/orders/${id}`),
  create: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => 
    fetchAPI<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
};

// Cart API - for potentially server-side cart functionality
export const cartAPI = {
  sync: (items: any[]) => 
    fetchAPI('/cart/sync', {
      method: 'POST',
      body: JSON.stringify({ items }),
    }),
};
