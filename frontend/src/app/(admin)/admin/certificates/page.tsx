"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import Link from "next/link";
import api from "@/utils/api";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import EditButton from "@/components/EditButton/EditButton";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expirationDate: string | null;
  credentialId: string | null;
  credentialUrl: string | null;
};

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const data = await api.getAll<Certificate>("certificates");
        setCertificates(data);
        setError("");
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError("Failed to load certificates");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDelete = (id: string) => {
    setCertificates(
      certificates.filter((certificate) => certificate.id !== id)
    );
  };

  // Format date to display month and year only
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "No Expiration";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <AdminDashboard>
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Certificates</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Manage Certificates</h2>
          <Link href="/admin/certificates/new">
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
              Add Certificate
            </button>
          </Link>
        </div>

        {loading ? (
          <p>Loading certificates...</p>
        ) : error ? (
          <p style={{ color: "var(--error-color)" }}>{error}</p>
        ) : certificates.length === 0 ? (
          <p>No certificates found. Add your first certificate!</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Title</th>
                <th style={{ width: "20%" }}>Issuer</th>
                <th style={{ width: "15%" }}>Issue Date</th>
                <th style={{ width: "15%" }}>Expiration</th>
                <th style={{ width: "20%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((certificate) => (
                <tr key={certificate.id}>
                  <td>{certificate.title}</td>
                  <td>{certificate.issuer}</td>
                  <td>{formatDate(certificate.issueDate)}</td>
                  <td>{formatDate(certificate.expirationDate)}</td>
                  <td className="admin-table__actions">
                    <EditButton
                      id={certificate.id}
                      basePath="/admin/certificates/edit"
                      size="small"
                    />
                    <DeleteButton
                      id={certificate.id}
                      endpoint="certificates"
                      onDelete={() => handleDelete(certificate.id)}
                      confirmMessage="Are you sure you want to delete this certificate?"
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
