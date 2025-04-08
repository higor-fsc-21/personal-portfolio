"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

type SkillFormProps = {
  initialData?: {
    id?: string;
    name: string;
    category: string;
    level: number;
  };
  mode: "create" | "edit";
};

const defaultSkill = {
  name: "",
  category: "",
  level: 3, // Default to intermediate level
};

export default function SkillForm({
  initialData = defaultSkill,
  mode,
}: SkillFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    category: initialData.category || "",
    level: initialData.level || 3,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getAll<{ category: string }>("skills");
        const uniqueCategories = Array.from(
          new Set(data.map((skill) => skill.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (formData.level < 1 || formData.level > 5) {
      newErrors.level = "Level must be between 1 and 5";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "level" ? parseInt(value, 10) : value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (mode === "create") {
        await api.create("skills", formData);
      } else {
        await api.update("skills", initialData.id!, formData);
      }

      // Redirect back to skills list
      router.push("/admin/skills");
    } catch (err) {
      console.error("Error saving skill:", err);

      // Check if it's an auth error
      if (
        err instanceof Error &&
        err.message.includes("Authentication required")
      ) {
        setSubmitError("Authentication required. Please log in.");
        setTimeout(() => {
          router.push("/admin/login");
        }, 1500);
        return;
      }

      setSubmitError("Failed to save skill. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Elementary";
      case 3:
        return "Intermediate";
      case 4:
        return "Advanced";
      case 5:
        return "Expert";
      default:
        return "";
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="name">
          Skill Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="admin-form__input"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.name && <div className="admin-form__error">{errors.name}</div>}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="category">
          Category
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            id="category"
            name="category"
            type="text"
            className="admin-form__input"
            value={formData.category}
            onChange={handleChange}
            disabled={isSubmitting}
            list="categories"
            placeholder="e.g., Programming Languages, Frameworks, Tools"
          />
          <datalist id="categories">
            {categories.map((category) => (
              <option key={category} value={category} />
            ))}
          </datalist>
        </div>
        {errors.category && (
          <div className="admin-form__error">{errors.category}</div>
        )}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="level">
          Proficiency Level: {getLevelLabel(formData.level)}
        </label>
        <div>
          <input
            type="range"
            id="level"
            name="level"
            min="1"
            max="5"
            step="1"
            value={formData.level}
            onChange={handleChange}
            disabled={isSubmitting}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>
        {errors.level && (
          <div className="admin-form__error">{errors.level}</div>
        )}
      </div>

      {submitError && (
        <div className="admin-form__error" style={{ marginBottom: "1rem" }}>
          {submitError}
        </div>
      )}

      <div className="admin-form__buttons">
        <button
          type="submit"
          className="admin-form__button admin-form__button--primary"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
            ? "Add Skill"
            : "Update Skill"}
        </button>
        <button
          type="button"
          className="admin-form__button admin-form__button--secondary"
          onClick={() => router.push("/admin/skills")}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
