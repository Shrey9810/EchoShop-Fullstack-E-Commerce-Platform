
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { authAPI } from "@/lib/api";
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateUserProfile: (name: string, email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const { user } = await authAPI.getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { user } = await authAPI.login(email, password);
      setUser(user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { user } = await authAPI.register(name, email, password);
      setUser(user);
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authAPI.logout();
      setUser(null);
      toast.success("You've been logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (name: string, email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { user: updatedUser } = await authAPI.updateProfile({ name, email });
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Profile update failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
