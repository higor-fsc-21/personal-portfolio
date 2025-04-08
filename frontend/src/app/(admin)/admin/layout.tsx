"use client";

import { ReactNode, useEffect } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import "./admin.scss";
import "./page.scss";
import AdminLogin from "@/components/AdminLogin/AdminLogin";

// Wrapper component to handle auth checks
function AuthCheck({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirect if already on login page or loading
    if (isLoading || pathname === "/admin/login") return;

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Important: Show login directly if not authenticated and not on login page
  if (!isLoading && !isAuthenticated && pathname !== "/admin/login") {
    return <AdminLogin />;
  }

  // Only render children if authenticated or on login page
  return isAuthenticated || pathname === "/admin/login" ? (
    <>{children}</>
  ) : null;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="admin-layout">
        <AuthCheck>{children}</AuthCheck>
      </div>
    </AuthProvider>
  );
}
