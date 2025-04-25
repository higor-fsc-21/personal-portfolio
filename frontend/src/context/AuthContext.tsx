"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import { API_BASE_URL } from "@/utils/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already authenticated
    const token = localStorage.getItem("admin-token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    try {
      console.log("Attempting login with password:", password);

      const response = await axios.post(`${API_BASE_URL}/auth`, {
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.success) {
        localStorage.setItem("admin-token", response.data.token);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error("Login error:", error);

      // Check if it's a specific error from the API
      if (error.response && error.response.data) {
        console.error("API error response:", error.response.data);
      }

      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin-token");
    setIsAuthenticated(false);

    // Using window.location reload to force full page refresh and redirect
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
