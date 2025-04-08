"use client";

import { useRouter } from "next/navigation";
import "./EditButton.scss";

interface EditButtonProps {
  id: string;
  basePath: string; // e.g., '/admin/experiences/edit'
  size?: "small" | "medium" | "large";
  isIconOnly?: boolean;
}

export default function EditButton({
  id,
  basePath,
  size = "medium",
  isIconOnly = true,
}: EditButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Make sure basePath doesn't end with a slash
    const normalizedPath = basePath.endsWith("/")
      ? basePath.slice(0, -1)
      : basePath;

    router.push(`${normalizedPath}/${id}`);
  };

  const sizeClass = `edit-button--${size}`;

  return (
    <button
      className={`edit-button ${sizeClass} ${
        isIconOnly ? "edit-button--icon-only" : ""
      }`}
      onClick={handleClick}
      aria-label="Edit"
      title="Edit"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="edit-button__icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
      {!isIconOnly && <span>Edit</span>}
    </button>
  );
}
