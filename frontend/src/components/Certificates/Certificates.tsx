"use client";

import { useState, useEffect } from "react";
import styles from "./Certificates.module.scss";
import api from "@/utils/api";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string | null;
  credentialUrl: string | null;
};

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        const response = await api.getAll<Certificate>("certificates");
        setCertificates(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError("Failed to load certificates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading certificates...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (certificates.length === 0) {
    return <div className={styles.empty}>No certificates available.</div>;
  }

  // Format date to display year only
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <div className={styles.certificatesContainer}>
      {certificates.map((cert) => (
        <div key={cert.id} className={styles.certificateCard}>
          <div className={styles.certificateIcon}>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className={styles.certificateContent}>
            <h3>{cert.title}</h3>
            <div className={styles.certificateDetails}>
              <div className={styles.issuer}>{cert.issuer}</div>
              <div className={styles.issueDate}>
                Issued {formatDate(cert.issueDate)}
              </div>
            </div>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.credentialLink}
              >
                See Credential
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
