"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import "./DeleteButton.scss";

interface DeleteButtonProps {
  id: string;
  endpoint: string;
  onDelete: () => void;
  confirmMessage?: string;
  redirectTo?: string;
  size?: "small" | "medium" | "large";
  isIconOnly?: boolean;
}

export default function DeleteButton({
  id,
  endpoint,
  onDelete,
  confirmMessage = "Are you sure you want to delete this item?",
  redirectTo,
  size = "medium",
  isIconOnly = true,
}: DeleteButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setIsLoading(true);
      await api.delete(endpoint, id);

      // Call the onDelete callback
      onDelete();

      // Redirect if specified
      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (err) {
      console.error(`Error deleting ${endpoint}:`, err);

      // Check if it's an auth error
      if (
        err instanceof Error &&
        err.message.includes("Authentication required")
      ) {
        alert("Authentication required. Please log in.");
        router.push("/admin/login");
        return;
      }

      alert(`Failed to delete. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClass = `delete-button--${size}`;

  return (
    <button
      className={`delete-button ${sizeClass} ${
        isIconOnly ? "delete-button--icon-only" : ""
      }`}
      onClick={handleDelete}
      disabled={isLoading}
      aria-label="Delete"
      title="Delete"
    >
      {isLoading ? (
        <svg
          className="delete-button__spinner"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="delete-button__icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          {!isIconOnly && <span>Delete</span>}
        </>
      )}
    </button>
  );
}
