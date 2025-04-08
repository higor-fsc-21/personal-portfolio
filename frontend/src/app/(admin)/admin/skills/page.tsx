"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import Link from "next/link";
import api from "@/utils/api";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await api.getAll<Skill>("skills");
        setSkills(data);
        setError("");
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleDelete = (id: string) => {
    setSkills(skills.filter((skill) => skill.id !== id));
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
        return "Unknown";
    }
  };

  return (
    <AdminDashboard>
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Skills</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Manage Skills</h2>
          <Link href="/admin/skills/new">
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
              Add Skill
            </button>
          </Link>
        </div>

        {loading ? (
          <p>Loading skills...</p>
        ) : error ? (
          <p style={{ color: "var(--error-color)" }}>{error}</p>
        ) : skills.length === 0 ? (
          <p>No skills found. Create your first skill!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Name</th>
                <th style={{ width: "30%" }}>Category</th>
                <th style={{ width: "20%" }}>Level</th>
                <th style={{ width: "20%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id}>
                  <td>{skill.name}</td>
                  <td>{skill.category}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          width: "100px",
                          height: "8px",
                          backgroundColor: "#f1f1f1",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${(skill.level / 5) * 100}%`,
                            height: "100%",
                            backgroundColor: "var(--primary-color)",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                      <span>{getLevelLabel(skill.level)}</span>
                    </div>
                  </td>
                  <td className="admin-table__actions">
                    <EditButton
                      id={skill.id}
                      basePath="/admin/skills/edit"
                      size="small"
                    />
                    <DeleteButton
                      id={skill.id}
                      endpoint="skills"
                      onDelete={() => handleDelete(skill.id)}
                      confirmMessage="Are you sure you want to delete this skill?"
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
