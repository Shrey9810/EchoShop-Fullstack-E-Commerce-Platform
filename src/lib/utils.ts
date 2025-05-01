
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { productAPI } from "./api";
import { Product } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function generateOrderId(): string {
  return `ORD${Math.floor(100000 + Math.random() * 900000)}`;
}

export function getRandomSubset<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// New utility functions that use the API
export async function fetchProducts(): Promise<Product[]> {
  try {
    return await productAPI.getAll();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    return await productAPI.getById(id);
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  try {
    return await productAPI.getByCategory(category);
  } catch (error) {
    console.error(`Failed to fetch products in category ${category}:`, error);
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    return await productAPI.search(query);
  } catch (error) {
    console.error(`Failed to search products with query "${query}":`, error);
    return [];
  }
}
