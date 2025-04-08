"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

type ExperienceFormProps = {
  initialData?: {
    id?: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string | null;
    description: string;
    technologies: string[];
  };
  mode: "create" | "edit";
};

const defaultExperience = {
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
  technologies: [],
};

export default function ExperienceForm({
  initialData = defaultExperience,
  mode,
}: ExperienceFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    company: initialData.company || "",
    position: initialData.position || "",
    startDate: initialData.startDate
      ? initialData.startDate.substring(0, 10)
      : "",
    endDate: initialData.endDate ? initialData.endDate.substring(0, 10) : "",
    description: initialData.description || "",
    technologies: initialData.technologies || [],
  });
  const [newTech, setNewTech] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(
    !initialData.endDate || initialData.endDate === ""
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.company.trim()) {
      newErrors.company = "Company is required";
    }

    if (!formData.position.trim()) {
      newErrors.position = "Position is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!currentlyWorking && !formData.endDate) {
      newErrors.endDate = "End date is required if not currently working";
    }

    if (
      formData.endDate &&
      formData.startDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
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

  const handleCurrentlyWorkingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setCurrentlyWorking(isChecked);

    if (isChecked) {
      setFormData((prev) => ({ ...prev, endDate: "" }));
      if (errors.endDate) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.endDate;
          return newErrors;
        });
      }
    }
  };

  const addTechnology = () => {
    if (!newTech.trim()) return;

    if (!formData.technologies.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      if (mode === "create") {
        await api.create("experiences", formData);
      } else {
        await api.update("experiences", initialData.id!, formData);
      }

      // Redirect back to experiences list
      router.push("/admin/experiences");
    } catch (err) {
      console.error("Error saving experience:", err);

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

      setSubmitError("Failed to save experience. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form__grid">
        <div className="admin-form__field">
          <label className="admin-form__label" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="admin-form__input"
            value={formData.company}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.company && (
            <div className="admin-form__error">{errors.company}</div>
          )}
        </div>

        <div className="admin-form__field">
          <label className="admin-form__label" htmlFor="position">
            Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            className="admin-form__input"
            value={formData.position}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.position && (
            <div className="admin-form__error">{errors.position}</div>
          )}
        </div>
      </div>

      <div className="admin-form__grid">
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
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <input
              id="endDate"
              name="endDate"
              type="date"
              className="admin-form__input"
              value={formData.endDate}
              onChange={handleChange}
              disabled={isSubmitting || currentlyWorking}
            />
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={currentlyWorking}
                onChange={handleCurrentlyWorkingChange}
                disabled={isSubmitting}
              />
              <span style={{ fontSize: "0.9rem" }}>I currently work here</span>
            </label>
          </div>
          {errors.endDate && (
            <div className="admin-form__error">{errors.endDate}</div>
          )}
        </div>
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
          rows={5}
        />
        {errors.description && (
          <div className="admin-form__error">{errors.description}</div>
        )}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="technologies">
          Technologies Used
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
            ? "Add Experience"
            : "Update Experience"}
        </button>
        <button
          type="button"
          className="admin-form__button admin-form__button--secondary"
          onClick={() => router.push("/admin/experiences")}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
