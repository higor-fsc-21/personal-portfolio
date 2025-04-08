"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import "./AdminLogin.scss";

export default function AdminLogin() {
  const { login } = useAuth();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      console.log("Trying to login with password:", password);
      const success = await login(password);
      console.log("Login success:", success);

      if (success) {
        router.push("/admin");
      } else {
        setError("Invalid password. Try using 'admin' for development.");
      }
    } catch (err) {
      console.error("Login component error:", err);
      setError(
        "Login failed. Check console for details. Try 'admin' as password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login__container">
        <h1 className="admin-login__title">Admin Dashboard</h1>
        {error && <div className="admin-login__error">{error}</div>}
        <div className="admin-login__hint">
          <strong>Development hint:</strong> Try using "admin" as the password.
        </div>
        <form className="admin-login__form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="admin-login__input"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="admin-login__button"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
