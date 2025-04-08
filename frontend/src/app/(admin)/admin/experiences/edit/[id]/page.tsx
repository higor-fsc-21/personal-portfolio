"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import ExperienceForm from "@/components/ExperienceForm/ExperienceForm";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

export default function EditExperiencePage() {
  const params = useParams();
  const id = params.id as string;
  const [experience, setExperience] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/experiences/${id}`
        );
        setExperience(response.data);
      } catch (err) {
        console.error("Error fetching experience:", err);
        setError("Failed to load experience. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  return (
    <AdminDashboard>
      <div className="admin-page">
        <header className="admin-page__header">
          <h1 className="admin-page__title">Edit Experience</h1>
        </header>
        <section className="admin-page__content">
          {loading && <LoadingSpinner />}

          {error && (
            <div className="admin-page__error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && experience && (
            <ExperienceForm initialData={experience} mode="edit" />
          )}
        </section>
      </div>
    </AdminDashboard>
  );
}
