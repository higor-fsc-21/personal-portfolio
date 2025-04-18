"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./Skills.module.scss";

type Skill = {
  id: string;
  name: string;
  category: string;
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [animateSkills, setAnimateSkills] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/skills");
        const fetchedSkills = response.data as Skill[];
        setSkills(fetchedSkills);

        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(fetchedSkills.map((skill: Skill) => skill.category))
        ) as string[];
        setCategories(uniqueCategories.reverse());

        setError(null);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimateSkills(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  if (loading) {
    return <div className={styles.loading}>Loading skills...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (skills.length === 0) {
    return <div className={styles.empty}>No skills available.</div>;
  }

  return (
    <div className={styles.skillsContainer} ref={skillsRef}>
      {categories.map((category) => (
        <div key={category} className={styles.skillCategory}>
          <h3>{category}</h3>
          <div className={styles.skillsList}>
            {skills
              .filter((skill) => skill.category === category)
              .map((skill, index) => (
                <div
                  key={skill.id}
                  className={`${styles.skillItem} ${
                    animateSkills ? styles.animate : ""
                  }`}
                  style={{ "--animation-order": index } as React.CSSProperties}
                >
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
