"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import styles from "./Projects.module.scss";
import unauthorizedImage from "../../assets/images/unauthorized_monitor.png";
import { API_BASE_URL } from "@/utils/api";

type Project = {
  _id: string;
  title: string;
  description: string;
  images: { url: string }[];
  technologies: string[];
  demoUrl: string | null;
  repoUrl: string | null;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/projects`);
        setProjects(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading projects...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (projects.length === 0) {
    return <div className={styles.empty}>No projects available.</div>;
  }

  const renderProjectImage = (project: Project) => {
    if (project.images?.length > 0)
      return <img src={project.images[0]?.url} alt={project.title} />;

    return (
      <Image
        fill
        alt="Unauthorized"
        src={unauthorizedImage.src}
        style={{ objectFit: "contain" }}
      />
    );
  };

  return (
    <div className={styles.projectsContainer} ref={projectsRef}>
      {projects.map((project, index) => (
        <div
          key={project._id}
          className={styles.projectCard}
          style={{ "--animation-order": index } as React.CSSProperties}
        >
          <Link
            href={`/projects/${project._id}`}
            className={styles.projectLink}
            onClick={(e) => {
              if (!project._id) {
                e.preventDefault();
                console.error("Project ID is undefined");
              }
            }}
          >
            <div className={styles.projectImage}>
              {renderProjectImage(project)}
            </div>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.projectTech}>
                {project.technologies.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.projectLinks}>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                  >
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    Live Demo
                  </a>
                )}

                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
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
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
