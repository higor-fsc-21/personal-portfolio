"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

type EducationFormProps = {
  initialData?: {
    id?: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string | null;
    description: string | null;
  };
  mode: "create" | "edit";
};

const defaultEducation = {
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  description: "",
};

export default function EducationForm({
  initialData = defaultEducation,
  mode,
}: EducationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    institution: initialData.institution || "",
    degree: initialData.degree || "",
    field: initialData.field || "",
    startDate: initialData.startDate
      ? initialData.startDate.substring(0, 10)
      : "",
    endDate: initialData.endDate ? initialData.endDate.substring(0, 10) : "",
    description: initialData.description || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [currentlyStudying, setCurrentlyStudying] = useState(
    !initialData.endDate || initialData.endDate === ""
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.institution.trim()) {
      newErrors.institution = "Institution is required";
    }

    if (!formData.degree.trim()) {
      newErrors.degree = "Degree is required";
    }

    if (!formData.field.trim()) {
      newErrors.field = "Field of study is required";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!currentlyStudying && !formData.endDate) {
      newErrors.endDate = "End date is required if not currently studying";
    }

    if (
      formData.endDate &&
      formData.startDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      newErrors.endDate = "End date cannot be before start date";
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

  const handleCurrentlyStudyingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = e.target.checked;
    setCurrentlyStudying(isChecked);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Update data format for submission as needed
      const dataToSubmit = {
        ...formData,
        endDate: currentlyStudying ? null : formData.endDate,
      };

      if (mode === "create") {
        await api.create("education", dataToSubmit);
      } else {
        await api.update("education", initialData.id!, dataToSubmit);
      }

      // Redirect back to education list
      router.push("/admin/education");
    } catch (err) {
      console.error("Error saving education:", err);

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

      setSubmitError("Failed to save education. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="institution">
          Institution
        </label>
        <input
          id="institution"
          name="institution"
          type="text"
          className="admin-form__input"
          value={formData.institution}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="e.g., Harvard University"
        />
        {errors.institution && (
          <div className="admin-form__error">{errors.institution}</div>
        )}
      </div>

      <div className="admin-form__grid">
        <div className="admin-form__field">
          <label className="admin-form__label" htmlFor="degree">
            Degree
          </label>
          <input
            id="degree"
            name="degree"
            type="text"
            className="admin-form__input"
            value={formData.degree}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="e.g., Bachelor of Science"
          />
          {errors.degree && (
            <div className="admin-form__error">{errors.degree}</div>
          )}
        </div>

        <div className="admin-form__field">
          <label className="admin-form__label" htmlFor="field">
            Field of Study
          </label>
          <input
            id="field"
            name="field"
            type="text"
            className="admin-form__input"
            value={formData.field}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="e.g., Computer Science"
          />
          {errors.field && (
            <div className="admin-form__error">{errors.field}</div>
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
              disabled={isSubmitting || currentlyStudying}
            />
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={currentlyStudying}
                onChange={handleCurrentlyStudyingChange}
                disabled={isSubmitting}
              />
              <span style={{ fontSize: "0.9rem" }}>
                I am currently studying here
              </span>
            </label>
          </div>
          {errors.endDate && (
            <div className="admin-form__error">{errors.endDate}</div>
          )}
        </div>
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="description">
          Description (Optional)
        </label>
        <textarea
          id="description"
          name="description"
          className="admin-form__textarea"
          value={formData.description}
          onChange={handleChange}
          disabled={isSubmitting}
          rows={4}
          placeholder="Add notable achievements, activities, or additional details"
        />
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
            ? "Add Education"
            : "Update Education"}
        </button>
        <button
          type="button"
          className="admin-form__button admin-form__button--secondary"
          onClick={() => router.push("/admin/education")}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
