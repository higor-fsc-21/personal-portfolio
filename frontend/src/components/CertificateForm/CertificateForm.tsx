"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

type CertificateFormProps = {
  initialData?: {
    id?: string;
    title: string;
    issuer: string;
    issueDate: string;
    expirationDate: string | null;
    credentialId: string | null;
    credentialUrl: string | null;
  };
  mode: "create" | "edit";
};

const defaultCertificate = {
  title: "",
  issuer: "",
  issueDate: "",
  expirationDate: "",
  credentialId: "",
  credentialUrl: "",
};

export default function CertificateForm({
  initialData = defaultCertificate,
  mode,
}: CertificateFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    issuer: initialData.issuer || "",
    issueDate: initialData.issueDate
      ? initialData.issueDate.substring(0, 10)
      : "",
    expirationDate: initialData.expirationDate
      ? initialData.expirationDate.substring(0, 10)
      : "",
    credentialId: initialData.credentialId || "",
    credentialUrl: initialData.credentialUrl || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [noExpiration, setNoExpiration] = useState(
    !initialData.expirationDate || initialData.expirationDate === ""
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Certificate title is required";
    }

    if (!formData.issuer.trim()) {
      newErrors.issuer = "Issuer is required";
    }

    if (!formData.issueDate) {
      newErrors.issueDate = "Issue date is required";
    }

    if (!noExpiration && !formData.expirationDate) {
      newErrors.expirationDate =
        "Expiration date is required if certificate expires";
    }

    if (
      formData.expirationDate &&
      formData.issueDate &&
      new Date(formData.expirationDate) < new Date(formData.issueDate)
    ) {
      newErrors.expirationDate = "Expiration date cannot be before issue date";
    }

    if (formData.credentialUrl && !isValidUrl(formData.credentialUrl)) {
      newErrors.credentialUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (err) {
      return false;
    }
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

  const handleNoExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setNoExpiration(isChecked);

    if (isChecked) {
      setFormData((prev) => ({ ...prev, expirationDate: "" }));
      if (errors.expirationDate) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.expirationDate;
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
        expirationDate: noExpiration ? null : formData.expirationDate,
        credentialId: formData.credentialId ? formData.credentialId : null,
        credentialUrl: formData.credentialUrl ? formData.credentialUrl : null,
      };

      if (mode === "create") {
        await api.create("certificates", dataToSubmit);
      } else {
        await api.update("certificates", initialData.id!, dataToSubmit);
      }

      // Redirect back to certificates list
      router.push("/admin/certificates");
    } catch (err) {
      console.error("Error saving certificate:", err);

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

      setSubmitError("Failed to save certificate. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="title">
          Certificate Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="admin-form__input"
          value={formData.title}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="e.g., AWS Certified Solutions Architect"
        />
        {errors.title && (
          <div className="admin-form__error">{errors.title}</div>
        )}
      </div>

      <div className="admin-form__field">
        <label className="admin-form__label" htmlFor="issuer">
          Issuing Organization
        </label>
        <input
          id="issuer"
          name="issuer"
          type="text"
          className="admin-form__input"
          value={formData.issuer}
          onChange={handleChange}
          disabled={isSubmitting}
          placeholder="e.g., Amazon Web Services"
        />
        {errors.issuer && (
          <div className="admin-form__error">{errors.issuer}</div>
        )}
      </div>

      <div className="admin-form__grid">
        <div className="admin-form__field">
          <label className="admin-form__label" htmlFor="issueDate">
            Issue Date
          </label>
          <input
            id="issueDate"
            name="issueDate"
            type="date"
            className="admin-form__input"
            value={formData.issueDate}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.issueDate && (
            <div className="admin-form__error">{errors.issueDate}</div>
          )}
        </div>

        <div className="admin-form__field">
          <label className="admin-form__label" htmlFor="expirationDate">
            Expiration Date
          </label>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <input
              id="expirationDate"
              name="expirationDate"
              type="date"
              className="admin-form__input"
              value={formData.expirationDate}
              onChange={handleChange}
              disabled={isSubmitting || noExpiration}
            />
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <input
                type="checkbox"
                checked={noExpiration}
                onChange={handleNoExpirationChange}
                disabled={isSubmitting}
              />
              <span style={{ fontSize: "0.9rem" }}>No expiration date</span>
            </label>
          </div>
          {errors.expirationDate && (
            <div className="admin-form__error">{errors.expirationDate}</div>
          )}
        </div>
      </div>

      <div className="admin-form__grid">
        <div className="admin-form__field">
          <label className="admin-form__label" htmlFor="credentialId">
            Credential ID (Optional)
          </label>
          <input
            id="credentialId"
            name="credentialId"
            type="text"
            className="admin-form__input"
            value={formData.credentialId}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="e.g., ABC123XYZ"
          />
        </div>

        <div className="admin-form__field">
          <label className="admin-form__label" htmlFor="credentialUrl">
            Credential URL (Optional)
          </label>
          <input
            id="credentialUrl"
            name="credentialUrl"
            type="url"
            className="admin-form__input"
            value={formData.credentialUrl}
            onChange={handleChange}
            disabled={isSubmitting}
            placeholder="https://www.example.com/verify/abc123"
          />
          {errors.credentialUrl && (
            <div className="admin-form__error">{errors.credentialUrl}</div>
          )}
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
            ? "Add Certificate"
            : "Update Certificate"}
        </button>
        <button
          type="button"
          className="admin-form__button admin-form__button--secondary"
          onClick={() => router.push("/admin/certificates")}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
