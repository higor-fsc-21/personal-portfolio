"use client";

import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import EducationForm from "@/components/EducationForm/EducationForm";

export default function NewEducationPage() {
  return (
    <AdminDashboard>
      <div className="admin-page">
        <header className="admin-page__header">
          <h1 className="admin-page__title">Add New Education</h1>
        </header>
        <section className="admin-page__content">
          <EducationForm mode="create" />
        </section>
      </div>
    </AdminDashboard>
  );
}
