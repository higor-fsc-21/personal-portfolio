"use client";

import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import ProjectForm from "@/components/ProjectForm/ProjectForm";

export default function NewProjectPage() {
  return (
    <AdminDashboard>
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Add New Project</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Project Details</h2>
        </div>
        <ProjectForm mode="create" />
      </div>
    </AdminDashboard>
  );
}
