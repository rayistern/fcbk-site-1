import type { FCEvent } from "@/lib/types";
import { formatDate, formatTime, daysUntil, sanitizeUrl } from "@/lib/utils";
import { toDirectImageUrl } from "@/lib/images";

interface EventCardProps {
  event: FCEvent;
  layout?: "feed" | "grid";
}

export function EventCard({ event, layout = "feed" }: EventCardProps) {
  const isFeed = layout === "feed";
  const imgUrl = toDirectImageUrl(event.imageUrl);

  return (
    <div className="card">
      {/* Color banner */}
      <div
        style={{
          height: "6px",
          background: `linear-gradient(90deg, ${event.color}, ${event.color}88)`,
        }}
      />

      {/* Optional event image */}
      {imgUrl && (
        <div
          style={{
            width: "100%",
            height: isFeed ? "160px" : "100px",
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div style={{ padding: isFeed ? "20px" : "16px" }}>
        {/* Date badge & countdown */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: `${event.color}15`,
              color: event.color,
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: 600,
              fontFamily: "var(--font-body)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {formatDate(event.date)}
          </span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--fc-primary)",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            {daysUntil(event.date)}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: isFeed ? "20px" : "17px",
            fontWeight: 700,
            color: "var(--fc-secondary)",
            marginBottom: "8px",
            fontFamily: "var(--font-display)",
            lineHeight: 1.25,
          }}
        >
          {event.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "14px",
            color: "var(--fc-text-muted)",
            marginBottom: "14px",
            lineHeight: 1.55,
            ...(isFeed
              ? {}
              : {
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }),
          }}
        >
          {event.description}
        </p>

        {/* Location & time */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            alignItems: "center",
            marginBottom: "16px",
            fontSize: "13px",
            color: "var(--fc-text-muted)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {event.location}
          </span>
          {event.endDate && (
            <span>
              {formatTime(event.date)} – {formatTime(event.endDate)}
            </span>
          )}
        </div>

        {/* Tags & CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {event.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          {event.registrationUrl && (
            <a
              href={sanitizeUrl(event.registrationUrl)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: event.color,
                color: "#fff",
                padding: "8px 18px",
                borderRadius: "14px",
                fontSize: "13px",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              Register
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
