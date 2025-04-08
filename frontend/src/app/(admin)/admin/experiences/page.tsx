"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import Link from "next/link";
import api from "@/utils/api";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";

type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
};

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const data = await api.getAll<Experience>("experiences");
        setExperiences(data);
        setError("");
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to load experiences");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((experience) => experience.id !== id));
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
        <h1 className="admin-dashboard__title">Work Experience</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Manage Experiences</h2>
          <Link href="/admin/experiences/new">
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
              Add Experience
            </button>
          </Link>
        </div>

        {loading ? (
          <p>Loading experiences...</p>
        ) : error ? (
          <p style={{ color: "var(--error-color)" }}>{error}</p>
        ) : experiences.length === 0 ? (
          <p>No experiences found. Create your first work experience!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "20%" }}>Company</th>
                <th style={{ width: "20%" }}>Position</th>
                <th style={{ width: "20%" }}>Date Range</th>
                <th style={{ width: "30%" }}>Description</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => (
                <tr key={experience.id}>
                  <td>{experience.company}</td>
                  <td>{experience.position}</td>
                  <td>
                    {formatDate(experience.startDate)} —{" "}
                    {formatDate(experience.endDate)}
                  </td>
                  <td>
                    {experience.description.length > 100
                      ? `${experience.description.substring(0, 100)}...`
                      : experience.description}
                  </td>
                  <td className="admin-table__actions">
                    <EditButton
                      id={experience.id}
                      basePath="/admin/experiences/edit"
                      size="small"
                    />
                    <DeleteButton
                      id={experience.id}
                      endpoint="experiences"
                      onDelete={() => handleDelete(experience.id)}
                      confirmMessage="Are you sure you want to delete this experience?"
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
