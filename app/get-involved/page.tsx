import {
  getPrograms,
  getSiteSettings,
  getInvolvementRoles,
} from "@/lib/airtable";
import { REVALIDATE } from "@/lib/config";
import { sanitizeUrl } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: "Get Involved | Friendship Circle Brooklyn",
  description: "Volunteer, enroll, sponsor, or partner with Friendship Circle Brooklyn.",
};

export default async function GetInvolvedPage() {
  const [settings, roles, programs] = await Promise.all([
    getSiteSettings(),
    getInvolvementRoles(),
    getPrograms(),
  ]);

  return (
    <div style={{ paddingBottom: "40px" }}>
      <div className="section-padding" style={{ paddingTop: "20px" }}>
        <h1 className="page-title">Get Involved</h1>
        <p className="page-subtitle">
          There&apos;s a place for everyone in our circle
        </p>
      </div>

      {/* ─── Role Cards (from Airtable "Get Involved" table) ─── */}
      <div
        className="section-padding"
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {roles.map((role) => (
          <div key={role.id} className="card">
            <div
              style={{
                height: "5px",
                background: `linear-gradient(90deg, ${role.color}, ${role.color}88)`,
              }}
            />
            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
                <div
                  style={{
                    fontSize: "36px", width: "56px", height: "56px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${role.color}12`, borderRadius: "16px", flexShrink: 0,
                  }}
                >
                  {role.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "17px", fontWeight: 700,
                      color: "var(--fc-secondary)",
                      marginBottom: "6px",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {role.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px", color: "var(--fc-text-muted)",
                      marginBottom: "14px", lineHeight: 1.5,
                    }}
                  >
                    {role.description}
                  </p>
                  <a
                    href={sanitizeUrl(role.ctaUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: role.color, color: "#fff",
                      padding: "10px 20px", borderRadius: "14px",
                      fontSize: "14px", fontWeight: 700,
                    }}
                  >
                    {role.ctaLabel}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Programs (from Airtable, layout from Settings) ─── */}
      {settings.showPrograms && programs.length > 0 && (
        <div className="section-padding" style={{ paddingTop: "28px" }}>
          <h2 className="section-title" style={{ marginBottom: "14px" }}>
            All Programs
          </h2>
          {settings.programsLayout === "grid" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className="card"
                  style={{ padding: "18px 14px", textAlign: "center", borderRadius: "16px" }}
                >
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>{prog.icon}</div>
                  <div
                    style={{
                      fontSize: "14px", fontWeight: 700,
                      color: "var(--fc-secondary)",
                      fontFamily: "var(--font-display)", marginBottom: "4px",
                    }}
                  >
                    {prog.title}
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--fc-text-muted)", lineHeight: 1.4 }}>
                    {prog.description}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className="card"
                  style={{
                    padding: "16px", display: "flex",
                    alignItems: "center", gap: "14px", borderRadius: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "28px", width: "48px", height: "48px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: `${prog.color}12`, borderRadius: "14px", flexShrink: 0,
                    }}
                  >
                    {prog.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "15px", fontWeight: 700,
                        color: "var(--fc-secondary)",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {prog.title}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--fc-text-muted)" }}>
                      {prog.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
