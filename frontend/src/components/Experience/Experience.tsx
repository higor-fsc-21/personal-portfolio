"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Experience.module.scss";
import api from "@/utils/api";

type Experience = {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
};

export default function Experience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        const response = await api.getAll<Experience>("experiences");
        setExperiences(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setError("Failed to load experiences. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll(
        `.${styles.timelineItem}`
      );
      items.forEach((item) => observer.observe(item));
    }

    return () => {
      observer.disconnect();
    };
  }, [loading, experiences]);

  if (loading) {
    return <div className={styles.loading}>Loading experiences...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (experiences.length === 0) {
    return <div className={styles.empty}>No experiences available.</div>;
  }

  // Format date to display month and year only
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={styles.timeline} ref={timelineRef}>
      {experiences.map((experience, index) => (
        <div
          key={experience.id}
          className={styles.timelineItem}
          style={{ "--animation-order": index } as React.CSSProperties}
        >
          <div className={styles.timelineDot}></div>
          <div className={styles.timelineContent}>
            <div className={styles.timelineHeader}>
              <h3>{experience.position}</h3>
              <span className={styles.company}>{experience.company}</span>
              <span className={styles.date}>
                {formatDate(experience.startDate)} —{" "}
                {formatDate(experience.endDate)}
              </span>
            </div>
            <p className={styles.description}>{experience.description}</p>
            <div className={styles.technologies}>
              {experience.technologies.map((tech) => (
                <span key={tech} className={styles.techBadge}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
