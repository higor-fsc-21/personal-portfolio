"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import EducationForm from "@/components/EducationForm/EducationForm";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function EditEducationPage() {
  const params = useParams();
  const id = params.id as string;
  const [education, setEducation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/education/${id}`
        );
        setEducation(response.data);
      } catch (err) {
        console.error("Error fetching education:", err);
        setError("Failed to load education. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [id]);

  return (
    <AdminDashboard>
      <div className="admin-page">
        <header className="admin-page__header">
          <h1 className="admin-page__title">Edit Education</h1>
        </header>
        <section className="admin-page__content">
          {loading && <LoadingSpinner />}

          {error && (
            <div className="admin-page__error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && education && (
            <EducationForm initialData={education} mode="edit" />
          )}
        </section>
      </div>
    </AdminDashboard>
  );
}
