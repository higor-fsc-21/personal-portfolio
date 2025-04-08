"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import Link from "next/link";
import api from "@/utils/api";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
};

export default function EducationPage() {
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const data = await api.getAll<Education>("education");
        setEducationList(data);
        setError("");
      } catch (err) {
        console.error("Error fetching education:", err);
        setError("Failed to load education information");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const handleDelete = (id: string) => {
    setEducationList(educationList.filter((edu) => edu.id !== id));
  };

  // Format date to display month and year only
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <AdminDashboard>
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Education</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Manage Education</h2>
          <Link href="/admin/education/new">
            <button className="admin-card__add-btn">
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Education
            </button>
          </Link>
        </div>

        {loading ? (
          <p>Loading education information...</p>
        ) : error ? (
          <p style={{ color: "var(--error-color)" }}>{error}</p>
        ) : educationList.length === 0 ? (
          <p>No education entries found. Add your educational background!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Institution</th>
                <th style={{ width: "20%" }}>Degree</th>
                <th style={{ width: "20%" }}>Field</th>
                <th style={{ width: "20%" }}>Date Range</th>
                <th style={{ width: "15%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {educationList.map((education) => (
                <tr key={education.id}>
                  <td>{education.institution}</td>
                  <td>{education.degree}</td>
                  <td>{education.field}</td>
                  <td>
                    {formatDate(education.startDate)} —{" "}
                    {formatDate(education.endDate)}
                  </td>
                  <td className="admin-table__actions">
                    <EditButton
                      id={education.id}
                      basePath="/admin/education/edit"
                      size="small"
                    />
                    <DeleteButton
                      id={education.id}
                      endpoint="education"
                      onDelete={() => handleDelete(education.id)}
                      confirmMessage="Are you sure you want to delete this education entry?"
                      size="small"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminDashboard>
  );
}
