"use client";

import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import ExperienceForm from "@/components/ExperienceForm/ExperienceForm";

export default function NewExperiencePage() {
  return (
    <AdminDashboard>
      <div className="admin-page">
        <header className="admin-page__header">
          <h1 className="admin-page__title">Add New Experience</h1>
        </header>
        <section className="admin-page__content">
          <ExperienceForm mode="create" />
        </section>
      </div>
    </AdminDashboard>
  );
}
