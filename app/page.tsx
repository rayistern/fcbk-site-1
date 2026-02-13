import Link from "next/link";
import {
  getUpcomingEvents,
  getPrograms,
  getTestimonials,
  getSiteSettings,
  getStats,
} from "@/lib/airtable";
import { REVALIDATE } from "@/lib/config";
import { EventCard } from "@/components/EventCard";
import { SwipeCarousel } from "@/components/SwipeCarousel";

export const revalidate = REVALIDATE;

export default async function HomePage() {
  const [settings, events, programs, testimonials, stats] = await Promise.all([
    getSiteSettings(),
    getUpcomingEvents(),
    getPrograms(),
    getTestimonials(),
    getStats(),
  ]);

  const upcomingPreview = events.slice(0, 3);

  return (
    <div style={{ paddingBottom: "40px" }}>
      {/* ─── Hero ─── */}
      <div
        style={{
          background: `linear-gradient(145deg, ${settings.colorSecondary} 0%, #2C3E6D 100%)`,
          padding: "50px 24px 44px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", top: "-40px", right: "-30px",
            width: "160px", height: "160px", borderRadius: "50%",
            background: `${settings.colorPrimary}22`,
          }}
        />
        <div
          style={{
            position: "absolute", bottom: "-20px", left: "-20px",
            width: "100px", height: "100px", borderRadius: "50%",
            background: `${settings.colorAccent}15`,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          {settings.heroBadge && (
            <div
              style={{
                display: "inline-block",
                background: `${settings.colorPrimary}30`,
                padding: "6px 14px",
                borderRadius: "20px",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  fontSize: "13px", color: "#FFB8AA",
                  fontWeight: 600, fontFamily: "var(--font-body)",
                }}
              >
                {settings.heroBadge}
              </span>
            </div>
          )}

          <h1
            style={{
              fontSize: "32px", fontWeight: 800, color: "#fff",
              marginBottom: "12px", fontFamily: "var(--font-display)",
              lineHeight: 1.15, letterSpacing: "-0.01em",
            }}
          >
            {settings.orgName}
          </h1>

          <p
            style={{
              fontSize: "16px", color: "rgba(255,255,255,0.75)",
              marginBottom: "24px", lineHeight: 1.5,
              maxWidth: "320px",
            }}
          >
            {settings.tagline}
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <Link href="/events" className="btn-primary">
              Upcoming Events
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/get-involved" className="btn-ghost">
              Get Involved
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Upcoming Events ─── */}
      {upcomingPreview.length > 0 && (
        <>
          <div className="section-padding" style={{ paddingTop: "24px" }}>
            <div className="section-header">
              <h2 className="section-title">Coming Up Next</h2>
              <Link href="/events" className="section-link">
                See All
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </div>
          <SwipeCarousel>
            {upcomingPreview.map((event) => (
              <EventCard key={event.id} event={event} layout="feed" />
            ))}
          </SwipeCarousel>
        </>
      )}

      {/* ─── Stats ─── */}
      {settings.showStats && stats.length > 0 && (
        <div className="section-padding" style={{ paddingTop: "12px" }}>
          <div
            style={{
              background: `linear-gradient(135deg, ${settings.colorPrimaryLight}, #FFF6E9)`,
              borderRadius: "20px",
              padding: "24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.id} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "28px", fontWeight: 800,
                    color: settings.colorPrimary,
                    fontFamily: "var(--font-display)",
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontSize: "13px", color: "var(--fc-text-muted)",
                    fontWeight: 500, marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── Programs ─── */}
      {settings.showPrograms && programs.length > 0 && (
        <div className="section-padding" style={{ paddingTop: "28px" }}>
          <h2 className="section-title" style={{ marginBottom: "14px" }}>
            Our Programs
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {programs.slice(0, 4).map((prog) => (
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
                    fontFamily: "var(--font-display)",
                    marginBottom: "4px",
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
        </div>
      )}

      {/* ─── Testimonials ─── */}
      {settings.showTestimonials && testimonials.length > 0 && (
        <div style={{ paddingTop: "28px" }}>
          <h2 className="section-title" style={{ padding: "0 20px", marginBottom: "14px" }}>
            Stories from Our Community
          </h2>
          <SwipeCarousel>
            {testimonials.map((t) => (
              <div
                key={t.id}
                style={{
                  background: `linear-gradient(135deg, ${settings.colorSecondary}, #2C3E6D)`,
                  borderRadius: "20px", padding: "24px",
                  position: "relative", overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute", top: "12px", right: "16px",
                    opacity: 0.15, fontSize: "60px",
                    color: settings.colorPrimary, lineHeight: 1,
                    fontFamily: "Georgia, serif",
                  }}
                >
                  &ldquo;
                </div>
                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <svg key={n} width="20" height="20" viewBox="0 0 24 24" fill={settings.colorAccent} stroke="none">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p
                  style={{
                    fontSize: "15px", color: "rgba(255,255,255,0.9)",
                    fontStyle: "italic", marginBottom: "16px",
                    lineHeight: 1.6, position: "relative", zIndex: 1,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#fff" }}>{t.author}</div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </SwipeCarousel>
        </div>
      )}

      {/* ─── Mission ─── */}
      <div className="section-padding" style={{ paddingTop: "20px" }}>
        <div className="card" style={{ padding: "24px" }}>
          <h2 className="section-title" style={{ marginBottom: "10px" }}>
            Our Mission
          </h2>
          <p style={{ fontSize: "14px", color: "var(--fc-text-muted)", lineHeight: 1.65 }}>
            {settings.mission}
          </p>
        </div>
      </div>
    </div>
  );
}
