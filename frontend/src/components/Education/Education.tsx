"use client";

import { useState, useEffect } from "react";
import styles from "./Education.module.scss";
import api from "@/utils/api";

type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string | null;
  description: string | null;
};

export default function Education() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const response = await api.getAll<Education>("education");
        setEducations(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching education:", err);
        setError(
          "Failed to load education information. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>Loading education information...</div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (educations.length === 0) {
    return (
      <div className={styles.empty}>No education information available.</div>
    );
  }

  // Format date to display year only
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <div className={styles.educationContainer}>
      {educations.map((edu) => (
        <div key={edu.id} className={styles.educationCard}>
          <div className={styles.educationLogo}>
            <span>{edu.institution.charAt(0)}</span>
          </div>
          <div className={styles.educationContent}>
            <h3 className={styles.degree}>
              {edu.degree} in {edu.field}
            </h3>
            <h4 className={styles.institution}>{edu.institution}</h4>
            <div className={styles.period}>
              {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
            </div>
            {edu.description && (
              <p className={styles.description}>{edu.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
