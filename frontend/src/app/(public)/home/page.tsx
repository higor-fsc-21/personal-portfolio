import { Metadata } from "next";
import styles from "./page.module.scss";
import Projects from "@/components/Projects/Projects";
import Experience from "@/components/Experience/Experience";
import Skills from "@/components/Skills/Skills";
import Education from "@/components/Education/Education";
import Certificates from "@/components/Certificates/Certificates";
import Contact from "@/components/Contact/Contact";

export const metadata: Metadata = {
  title: "Higor Felype - Frontend Developer",
  description:
    "Frontend Developer specializing in React, React Native, and Next.js",
};

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className="container">
          <h1>Higor Felype S. Carvalho</h1>
          <h2>Frontend Developer | React, React Native, Next.js</h2>
          <p>Building scalable, high-performance web and mobile applications</p>
          <div className={styles.heroButtons}>
            <a href="#contact" className={styles.primaryButton}>
              Contact Me
            </a>
            <a href="#projects" className={styles.secondaryButton}>
              View My Work
            </a>
          </div>
        </div>
      </section>

      <section id="about" className={`${styles.section} ${styles.about}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>About Me</h2>
          </div>
          <div className={styles.aboutContent}>
            <p>
              Frontend Developer with 4+ years of experience specializing in
              React, React Native, and Next.js. Proficient in building scalable,
              high-performance web and mobile applications using modern tools
              like TypeScript, Redux Toolkit, and Styled-Components.
            </p>
            <p>
              Experienced in Agile methodologies, CI/CD pipelines, and
              micro-frontend architecture. Passionate about delivering
              user-centric solutions with a focus on performance optimization,
              accessibility, and responsive design.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className={`${styles.section} ${styles.skills}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Technical Skills</h2>
          </div>
          <Skills />
        </div>
      </section>

      <section
        id="experience"
        className={`${styles.section} ${styles.experience}`}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Work Experience</h2>
          </div>
          <Experience />
        </div>
      </section>

      <section id="projects" className={`${styles.section} ${styles.projects}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Projects</h2>
          </div>
          <Projects />
        </div>
      </section>

      <section
        id="education"
        className={`${styles.section} ${styles.education}`}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Education</h2>
          </div>
          <Education />
        </div>
      </section>

      <section
        id="certificates"
        className={`${styles.section} ${styles.certificates}`}
      >
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Certificates</h2>
          </div>
          <Certificates />
        </div>
      </section>

      <section id="contact" className={`${styles.section} ${styles.contact}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Contact Me</h2>
          </div>
          <Contact />
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Higor Felype S. Carvalho. All
            rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
