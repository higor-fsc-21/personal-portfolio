"use client";

import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import CertificateForm from "@/components/CertificateForm/CertificateForm";

export default function NewCertificatePage() {
  return (
    <AdminDashboard>
      <div className="admin-page">
        <header className="admin-page__header">
          <h1 className="admin-page__title">Add New Certificate</h1>
        </header>
        <section className="admin-page__content">
          <CertificateForm mode="create" />
        </section>
      </div>
    </AdminDashboard>
  );
}
