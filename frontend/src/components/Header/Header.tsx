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
              <a href="#about" onClick={() => setIsMenuOpen(false)}>
                About
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#skills" onClick={() => setIsMenuOpen(false)}>
                Skills
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#experience" onClick={() => setIsMenuOpen(false)}>
                Experience
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#projects" onClick={() => setIsMenuOpen(false)}>
                Projects
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#education" onClick={() => setIsMenuOpen(false)}>
                Education
              </a>
            </li>
            <li className={styles.navItem}>
              <a href="#certificates" onClick={() => setIsMenuOpen(false)}>
                Certificates
              </a>
            </li>
            <li className={styles.navItem}>
              <a
                href="#contact"
                className={styles.contactButton}
                onClick={() => setIsMenuOpen(false)}
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
