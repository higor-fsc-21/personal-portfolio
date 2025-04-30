"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import styles from "./ProjectDetails.module.scss";
import api from "@/utils/api";

type Project = {
  _id: string;
  title: string;
  description: string;
  images: { url: string; alt: string }[];
  technologies: string[];
  githubUrl?: string;
  startDate: string;
  endDate: string | null;
};

export default function ProjectDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const response = await api.getById<Project>("projects", id as string);
        setProject(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to load project details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleBack = () => router.push("/#projects");

  if (loading) {
    return <div className={styles.loading}>Loading project details...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!project) {
    return <div className={styles.notFound}>Project not found.</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={handleBack} className={styles.backButton}>
        ← Back to Projects
      </button>

      <div className={styles.projectDetails}>
        <h1 className={styles.title}>{project.title}</h1>

        <div className={styles.imageGallery}>
          {project.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={image.alt}
              className={styles.projectImage}
            />
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.description}>
            <h2>About the Project</h2>
            <p>{project.description}</p>
          </div>

          <div className={styles.technologies}>
            <h2>Technologies Used</h2>
            <div className={styles.techList}>
              {project.technologies.map((tech) => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.timeline}>
            <h2>Timeline</h2>
            <p>
              {new Date(project.startDate).toLocaleDateString()} -{" "}
              {project.endDate
                ? new Date(project.endDate).toLocaleDateString()
                : "Present"}
            </p>
          </div>

          {project.githubUrl && (
            <div className={styles.links}>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
