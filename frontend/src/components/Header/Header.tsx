"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logo}>
            H<span>F</span>
          </Link>
        </div>

        <button
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ""}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="#about" onClick={(e) => handleNavClick(e, "about")}>
                About
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#skills" onClick={(e) => handleNavClick(e, "skills")}>
                Skills
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#experience"
                onClick={(e) => handleNavClick(e, "experience")}
              >
                Experience
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#projects"
                onClick={(e) => handleNavClick(e, "projects")}
              >
                Projects
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#education"
                onClick={(e) => handleNavClick(e, "education")}
              >
                Education
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#certificates"
                onClick={(e) => handleNavClick(e, "certificates")}
              >
                Certificates
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#contact"
                className={styles.contactButton}
                onClick={(e) => handleNavClick(e, "contact")}
              >
                Contact Me
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
