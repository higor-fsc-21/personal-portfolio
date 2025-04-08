"use client";

import { useState, ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import AdminLogin from "../AdminLogin/AdminLogin";

type AdminDashboardProps = {
  children: ReactNode;
};

export default function AdminDashboard({ children }: AdminDashboardProps) {
  const { isAuthenticated, logout, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="admin-dashboard">
      <AdminSidebar sidebarOpen={sidebarOpen} />
      <div className="admin-dashboard__content">
        <div className="admin-dashboard__header">
          <button
            className="admin-dashboard__toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="admin-dashboard__actions">
            <button className="admin-dashboard__logout-btn" onClick={logout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
