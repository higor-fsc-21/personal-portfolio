"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import SkillForm from "@/components/SkillForm/SkillForm";

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

export default function EditSkillPage() {
  const params = useParams();
  const router = useRouter();
  const skillId = params.id as string;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkill = async () => {
      if (!skillId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3001/api/skills/${skillId}`
        );
        setSkill(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching skill:", err);
        setError(
          "Failed to load skill. It may have been deleted or you have insufficient permissions."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [skillId]);

  if (loading) {
    return (
      <AdminDashboard>
        <div className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Edit Skill</h1>
        </div>
        <div className="admin-card">
          <p>Loading skill details...</p>
        </div>
      </AdminDashboard>
    );
  }

  if (error || !skill) {
    return (
      <AdminDashboard>
        <div className="admin-dashboard__header">
          <h1 className="admin-dashboard__title">Edit Skill</h1>
        </div>
        <div className="admin-card">
          <div className="admin-card__header">
            <h2 className="admin-card__title">Error</h2>
          </div>
          <p style={{ color: "var(--error-color)" }}>
            {error || "Skill not found"}
          </p>
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => router.push("/admin/skills")}
              className="admin-form__button admin-form__button--secondary"
            >
              Back to Skills
            </button>
          </div>
        </div>
      </AdminDashboard>
    );
  }

  return (
    <AdminDashboard>
      <div className="admin-dashboard__header">
        <h1 className="admin-dashboard__title">Edit Skill</h1>
      </div>

      <div className="admin-card">
        <div className="admin-card__header">
          <h2 className="admin-card__title">Skill Details</h2>
        </div>
        <SkillForm initialData={skill} mode="edit" />
      </div>
    </AdminDashboard>
  );
}
