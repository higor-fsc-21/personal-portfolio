"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

type ProjectFormProps = {
  initialData?: {
    id?: string;
    title: string;
    description: string;
    images: { url: string; alt: string }[];
    technologies: string[];
    demoUrl: string | null;
    repoUrl: string | null;
    startDate: string;
    endDate: string | null;
  };
  mode: "create" | "edit";
};

const defaultProject = {
  title: "",
  description: "",
  images: [],
  technologies: [],
  demoUrl: "",
  repoUrl: "",
  startDate: "",
  endDate: "",
};

export default function ProjectForm({
  initialData = defaultProject,
  mode,
}: ProjectFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    description: initialData.description || "",
    images: initialData.images || [],
    technologies: initialData.technologies || [],
    demoUrl: initialData.demoUrl || "",
    repoUrl: initialData.repoUrl || "",
    startDate: initialData.startDate
      ? initialData.startDate.substring(0, 10)
      : "",
    endDate: initialData.endDate ? initialData.endDate.substring(0, 10) : "",
  });
  const [newTech, setNewTech] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isOngoing, setIsOngoing] = useState(
    !initialData.endDate || initialData.endDate === ""
  );
  const [previewImages, setPreviewImages] = useState<
    { url: string; alt: string }[]
  >(initialData.images || []);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!isOngoing && !formData.endDate) {
      newErrors.endDate = "End date is required if not ongoing";
    }

    if (
      formData.endDate &&
      formData.startDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (formData.technologies.length === 0) {
      newErrors.technologies = "At least one technology is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const addTechnology = () => {
    if (!newTech.trim()) return;

    if (!formData.technologies.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }));

      // Clear error for technologies if it exists
      if (errors.technologies) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.technologies;
          return newErrors;
        });
      }
    }

    setNewTech("");
  };

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Create preview URLs for selected images
    const newPreviewImages = Array.from(files).map((file) => ({
      url: URL.createObjectURL(file),
      alt: formData.title || "Project image",
    }));

    setPreviewImages((prev) => [...prev, ...newPreviewImages]);
  };

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const formDataToSend = new FormData();

      // Append all form fields except images
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") return; // Skip images array

        if (Array.isArray(value)) {
          value.forEach((item) => formDataToSend.append(key, String(item)));
        } else {
          formDataToSend.append(key, String(value));
        }
      });

      // Append images if there are any new ones
      if (fileInputRef.current?.files) {
        Array.from(fileInputRef.current.files).forEach((file) => {
          formDataToSend.append("images", file);
        });
      }

      if (mode === "create") {
        await api.create("projects", formDataToSend);
      } else {
        await api.update("projects", initialData.id!, formDataToSend);
      }

      router.push("/admin/projects");
    } catch (err) {
      console.error("Error saving project:", err);

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

      setSubmitError("Failed to save project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="admin-form__input"
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.title && (
          <div className="admin-form__error">{errors.title}</div>
        )}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="admin-form__textarea"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.description && (
          <div className="admin-form__error">{errors.description}</div>
        )}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="technologies">
          Technologies
        </label>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            id="technologies"
            type="text"
            className="admin-form__input"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSubmitting}
            placeholder="Add a technology and press Enter"
          />
          <button
            type="button"
            onClick={addTechnology}
            className="admin-form__button admin-form__button--primary"
            disabled={isSubmitting || !newTech.trim()}
            style={{ padding: "0.75rem 1rem" }}
          >
            Add
          </button>
        </div>
        <div className="admin-form__tags">
          {formData.technologies.map((tech) => (
            <div key={tech} className="admin-form__tag">
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(tech)}
                disabled={isSubmitting}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
        {errors.technologies && (
          <div className="admin-form__error">{errors.technologies}</div>
        )}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="startDate">
          Start Date
        </label>
        <input
          id="startDate"
          name="startDate"
          type="date"
          className="admin-form__input"
          value={formData.startDate}
          onChange={handleChange}
          disabled={isSubmitting}
        />
        {errors.startDate && (
          <div className="admin-form__error">{errors.startDate}</div>
        )}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="endDate">
          End Date
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <input
            id="endDate"
            name="endDate"
            type="date"
            className="admin-form__input"
            value={formData.endDate}
            onChange={handleChange}
            disabled={isSubmitting || isOngoing}
          />
          <label
            style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <input
              type="checkbox"
              checked={isOngoing}
              onChange={(e) => {
                setIsOngoing(e.target.checked);
                if (e.target.checked) {
                  setFormData((prev) => ({ ...prev, endDate: "" }));
                }
              }}
              disabled={isSubmitting}
            />
            Ongoing Project
          </label>
        </div>
        {errors.endDate && (
          <div className="admin-form__error">{errors.endDate}</div>
        )}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="demoUrl">
          Demo URL (optional)
        </label>
        <input
          id="demoUrl"
          name="demoUrl"
          type="text"
          className="admin-form__input"
          value={formData.demoUrl}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="repoUrl">
          Repository URL (optional)
        </label>
        <input
          id="repoUrl"
          name="repoUrl"
          type="text"
          className="admin-form__input"
          value={formData.repoUrl}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label">Project Images</label>
        <div className="admin-form__image-upload">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            multiple
            className="admin-form__file-input"
            disabled={isSubmitting}
          />
          <div className="admin-form__image-preview">
            {previewImages.map((image, index) => (
              <div key={index} className="admin-form__image-preview-item">
                <img src={image.url} alt={image.alt} />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="admin-form__image-remove"
                  disabled={isSubmitting}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
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
            ? "Create Project"
            : "Update Project"}
        </button>
        <button
          type="button"
          className="admin-form__button admin-form__button--secondary"
          onClick={() => router.push("/admin/projects")}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
