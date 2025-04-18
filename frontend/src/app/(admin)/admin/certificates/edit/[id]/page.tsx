"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import CertificateForm from "@/components/CertificateForm/CertificateForm";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import api from "@/utils/api";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
};

export default function EditCertificatePage() {
  const params = useParams();
  const id = params.id as string;
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const data = await api.getById<Certificate>("certificates", id);
        setCertificate(data);
      } catch (err) {
        console.error("Error fetching certificate:", err);
        setError("Failed to load certificate. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  return (
    <AdminDashboard>
      <div className="admin-page">
        <header className="admin-page__header">
          <h1 className="admin-page__title">Edit Certificate</h1>
        </header>
        <section className="admin-page__content">
          {loading && <LoadingSpinner />}

          {error && (
            <div className="admin-page__error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && certificate && (
            <CertificateForm initialData={certificate} mode="edit" />
          )}
        </section>
      </div>
    </AdminDashboard>
  );
}
