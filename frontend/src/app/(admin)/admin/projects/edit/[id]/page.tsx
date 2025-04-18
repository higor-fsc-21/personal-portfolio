"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import ProjectForm from "@/components/ProjectForm/ProjectForm";
import api from "@/utils/api";

type Project = {
  id: string;
  title: string;
  description: string;
  images: { url: string; alt: string }[];
  technologies: string[];
  demoUrl: string | null;
  repoUrl: string | null;
  startDate: string;
  endDate: string | null;
};

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) return;

      try {
        setLoading(true);
        const data = await api.getById<Project>("projects", projectId);
        setProject(data);
        setError("");
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(
          "Failed to load project. It may have been deleted or you have insufficient permissions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <AdminDashboard>
        <div className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Edit Project</h1>
        </div>
        <div className="admin-card">
          <p>Loading project details...</p>
        </div>
      </AdminDashboard>
    );
  }

  if (error || !project) {
    return (
      <AdminDashboard>
        <div className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Edit Project</h1>
        </div>
        <div className="admin-card">
          <div className="admin-card__header">
            <h2 className="admin-card__title">Error</h2>
          </div>
          <p style={{ color: "var(--error-color)" }}>
            {error || "Project not found"}
          </p>
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => router.push("/admin/projects")}
              className="admin-form__button admin-form__button--secondary"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </AdminDashboard>
    );
  }

  return (
    <AdminDashboard>
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Edit Project</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Project Details</h2>
        </div>
        <ProjectForm initialData={project} mode="edit" />
      </div>
    </AdminDashboard>
  );
}
