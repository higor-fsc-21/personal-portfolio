"use client";

import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import SkillForm from "@/components/SkillForm/SkillForm";

export default function NewSkillPage() {
  return (
    <AdminDashboard>
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Add New Skill</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Skill Details</h2>
        </div>
        <SkillForm mode="create" />
      </div>
    </AdminDashboard>
  );
}
