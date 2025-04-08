"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import Link from "next/link";
import api from "@/utils/api";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";

type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  demoUrl: string | null;
  repoUrl: string | null;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await api.getAll<Project>("projects");
        setProjects(data);
        setError("");
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id));
  };

  return (
    <AdminDashboard>
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Projects</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Manage Projects</h2>
          <Link href="/admin/projects/new">
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
              Add Project
            </button>
          </Link>
        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : error ? (
          <p style={{ color: "var(--error-color)" }}>{error}</p>
        ) : projects.length === 0 ? (
          <p>No projects found. Create your first project!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Title</th>
                <th style={{ width: "40%" }}>Description</th>
                <th style={{ width: "20%" }}>Technologies</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>
                    {project.description.length > 100
                      ? `${project.description.substring(0, 100)}...`
                      : project.description}
                  </td>
                  <td>{project.technologies.join(", ")}</td>
                  <td className="admin-table__actions">
                    <EditButton
                      id={project.id}
                      basePath="/admin/projects/edit"
                      size="small"
                    />
                    <DeleteButton
                      id={project.id}
                      endpoint="projects"
                      onDelete={() => handleDelete(project.id)}
                      confirmMessage="Are you sure you want to delete this project?"
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
