import { getUpcomingEvents, getSiteSettings } from "@/lib/airtable";
import { REVALIDATE } from "@/lib/config";
import { EventCard } from "@/components/EventCard";
import type { Metadata } from "next";

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: "Events | Friendship Circle Brooklyn",
  description: "Upcoming events at Friendship Circle Brooklyn.",
};

export default async function EventsPage() {
  const [settings, events] = await Promise.all([
    getSiteSettings(),
    getUpcomingEvents(),
  ]);

  return (
    <div style={{ paddingBottom: "40px" }}>
      <div className="section-padding" style={{ paddingTop: "20px" }}>
        <h1 className="page-title">Upcoming Events</h1>
        <p className="page-subtitle">
          {events.length} event{events.length !== 1 ? "s" : ""} coming up
        </p>
      </div>

      {events.length > 0 ? (
        settings.eventsLayout === "feed" ? (
          <div
            className="section-padding"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} layout="feed" />
            ))}
          </div>
        ) : (
          <div
            className="section-padding"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} layout="grid" />
            ))}
          </div>
        )
      ) : (
        <div style={{ padding: "60px 40px", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>📅</div>
          <p style={{ fontSize: "16px", color: "var(--fc-text-muted)" }}>
            No upcoming events right now. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
