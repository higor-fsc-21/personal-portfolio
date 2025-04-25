"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";

type DashboardStats = {
  projects: number;
  skills: number;
  experiences: number;
  education: number;
  certificates: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    experiences: 0,
    education: 0,
    certificates: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Fetch counts from backend APIs
        const [
          projectsRes,
          skillsRes,
          experiencesRes,
          educationRes,
          certificatesRes,
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/projects`),
          axios.get(`${API_BASE_URL}/skills`),
          axios.get(`${API_BASE_URL}/experiences`),
          axios.get(`${API_BASE_URL}/education`),
          axios.get(`${API_BASE_URL}/certificates`),
        ]);

        setStats({
          projects: projectsRes.data.length,
          skills: skillsRes.data.length,
          experiences: experiencesRes.data.length,
          education: educationRes.data.length,
          certificates: certificatesRes.data.length,
        });

        setError("");
      } catch (err) {
        console.error("Error fetching stats:", err);
        setError("Failed to load dashboard statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <AdminDashboard>
      <h1 className="admin-dashboard__title">Dashboard</h1>

      {loading ? (
        <p>Loading statistics...</p>
      ) : error ? (
        <p style={{ color: "var(--error-color)" }}>{error}</p>
      ) : (
        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
            }}
          >
            <StatCard
              title="Projects"
              count={stats.projects}
              icon={
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              }
              link="/admin/projects"
            />

            <StatCard
              title="Skills"
              count={stats.skills}
              icon={
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
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              }
              link="/admin/skills"
            />

            <StatCard
              title="Experiences"
              count={stats.experiences}
              icon={
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
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              link="/admin/experiences"
            />

            <StatCard
              title="Education"
              count={stats.education}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              }
              link="/admin/education"
            />

            <StatCard
              title="Certificates"
              count={stats.certificates}
              icon={
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              }
              link="/admin/certificates"
            />
          </div>

          <div style={{ marginTop: "3rem" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                marginBottom: "1rem",
                color: "var(--secondary-color)",
              }}
            >
              Quick Actions
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <QuickActionButton
                title="Add New Project"
                link="/admin/projects/new"
                icon={
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                }
              />
              <QuickActionButton
                title="Add New Skill"
                link="/admin/skills/new"
                icon={
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                }
              />
              <QuickActionButton
                title="Add New Experience"
                link="/admin/experiences/new"
                icon={
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                }
              />
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                  color: "var(--secondary-color)",
                }}
              >
                Profile & Site Management
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                <QuickActionButton
                  title="Edit Personal Info"
                  link="/admin/profile"
                  icon={
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  }
                />
                <QuickActionButton
                  title="Site Settings"
                  link="/admin/settings"
                  icon={
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  }
                  isComingSoon={true}
                />
                <QuickActionButton
                  title="Contact Information"
                  link="/admin/contact-info"
                  icon={
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  }
                  isComingSoon={true}
                />
                <QuickActionButton
                  title="View Messages"
                  link="/admin/messages"
                  icon={
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
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4v-4z"
                      />
                    </svg>
                  }
                  isComingSoon={true}
                />
              </div>
            </div>

            <div style={{ marginTop: "1.5rem" }}>
              <h2
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                  color: "var(--secondary-color)",
                }}
              >
                Analytics & Utilities
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                <QuickActionButton
                  title="Site Analytics"
                  link="/admin/analytics"
                  icon={
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  }
                  isComingSoon={true}
                />
                <QuickActionButton
                  title="Backup Data"
                  link="/admin/backup"
                  icon={
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
                        d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  }
                  isComingSoon={true}
                />
                <QuickActionButton
                  title="SEO Settings"
                  link="/admin/seo"
                  icon={
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  }
                  isComingSoon={true}
                />
                <QuickActionButton
                  title="Theme Editor"
                  link="/admin/theme"
                  icon={
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
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  }
                  isComingSoon={true}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminDashboard>
  );
}

function StatCard({
  title,
  count,
  icon,
  link,
}: {
  title: string;
  count: number;
  icon: React.ReactNode;
  link: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "1.5rem",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <h3 style={{ fontSize: "1.25rem", margin: 0 }}>{title}</h3>
        <div
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "8px",
            backgroundColor: "rgba(54, 149, 222, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--primary-color)",
          }}
        >
          <div style={{ width: "1.5rem", height: "1.5rem" }}>{icon}</div>
        </div>
      </div>

      <div
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        {count}
      </div>

      <Link
        href={link}
        style={{
          color: "var(--primary-color)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        View Details
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ width: "1rem", height: "1rem", marginLeft: "0.25rem" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </div>
  );
}

function QuickActionButton({
  title,
  link,
  icon,
  isComingSoon = false,
}: {
  title: string;
  link: string;
  icon: React.ReactNode;
  isComingSoon?: boolean;
}) {
  const buttonContent = (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        padding: "1rem",
        transition: "transform 0.2s, box-shadow 0.2s",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        cursor: isComingSoon ? "default" : "pointer",
        position: "relative",
        opacity: isComingSoon ? 0.7 : 1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "2rem",
          height: "2rem",
          borderRadius: "8px",
          backgroundColor: isComingSoon
            ? "rgba(150, 150, 150, 0.1)"
            : "rgba(54, 149, 222, 0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isComingSoon
            ? "var(--secondary-color)"
            : "var(--primary-color)",
          flexShrink: 0,
        }}
      >
        <div style={{ width: "1.25rem", height: "1.25rem" }}>{icon}</div>
      </div>
      <span
        style={{
          color: isComingSoon ? "var(--secondary-color)" : "var(--text-color)",
          fontWeight: 500,
          fontSize: "0.9rem",
        }}
      >
        {title}
      </span>

      {isComingSoon && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            background: "var(--secondary-color)",
            color: "white",
            fontSize: "0.65rem",
            padding: "2px 6px",
            borderRadius: "4px",
            fontWeight: "bold",
            transform: "rotate(0deg)",
            zIndex: 1,
          }}
        >
          COMING SOON
        </div>
      )}
    </div>
  );

  if (isComingSoon) {
    return buttonContent;
  }

  return (
    <Link href={link} style={{ textDecoration: "none" }}>
      {buttonContent}
    </Link>
  );
}
