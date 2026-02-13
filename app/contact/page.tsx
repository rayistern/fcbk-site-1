import { getContacts, getSiteSettings } from "@/lib/airtable";
import { REVALIDATE } from "@/lib/config";
import { sanitizeUrl } from "@/lib/utils";
import type { Metadata } from "next";

export const revalidate = REVALIDATE;

export const metadata: Metadata = {
  title: "Contact | Friendship Circle Brooklyn",
  description: "Get in touch with Friendship Circle Brooklyn.",
};

export default async function ContactPage() {
  const [settings, contacts] = await Promise.all([
    getSiteSettings(),
    getContacts(),
  ]);

  return (
    <div style={{ padding: "20px", paddingBottom: "40px" }}>
      {/* ─── Phone Frame ─── */}
      <div
        style={{
          background: `linear-gradient(170deg, ${settings.colorSecondary}, #2C3E6D)`,
          borderRadius: "32px", padding: "3px",
          boxShadow: "0 8px 40px rgba(27,40,69,0.25)",
          maxWidth: "400px", margin: "0 auto",
        }}
      >
        <div style={{ background: "#0D1B2A", borderRadius: "30px", overflow: "hidden" }}>
          {/* Notch */}
          <div style={{ display: "flex", justifyContent: "center", padding: "10px 0 6px", position: "relative" }}>
            <div style={{ width: "120px", height: "28px", background: "#000", borderRadius: "14px" }} />
            <div style={{ position: "absolute", right: "24px", top: "14px", display: "flex", gap: "4px", alignItems: "center" }}>
              <div style={{ width: "14px", height: "8px", border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: "2px", position: "relative" }}>
                <div style={{ position: "absolute", right: "-3px", top: "2px", width: "1.5px", height: "4px", background: "rgba(255,255,255,0.4)", borderRadius: "1px" }} />
                <div style={{ width: "70%", height: "100%", background: "#34C759", borderRadius: "1px" }} />
              </div>
            </div>
          </div>

          {/* Screen */}
          <div style={{ background: "linear-gradient(180deg, #0D1B2A, #162A45)", padding: "16px 18px 28px", minHeight: "520px" }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "64px", height: "64px",
                  background: `linear-gradient(135deg, ${settings.colorPrimary}, ${settings.colorAccent})`,
                  borderRadius: "20px",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "28px", margin: "0 auto 12px",
                  boxShadow: `0 4px 16px ${settings.colorPrimary}44`,
                }}
              >
                🤝
              </div>
              <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#fff", marginBottom: "4px", fontFamily: "var(--font-display)" }}>
                {settings.orgName}
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
                {settings.address}
              </p>
            </div>

            {/* Quick Actions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
              {[
                { label: "Call", color: "#34C759", href: `tel:${settings.phone}`, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg> },
                { label: "WhatsApp", color: "#25D366", href: `https://wa.me/${settings.whatsapp?.replace(/[^0-9]/g, "")}`, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg> },
                { label: "Email", color: "#5AC8FA", href: `mailto:${settings.email}`, icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
              ].map((action, i) => (
                <a
                  key={i}
                  href={sanitizeUrl(action.href)}
                  target={action.label === "WhatsApp" ? "_blank" : undefined}
                  rel={action.label === "WhatsApp" ? "noopener noreferrer" : undefined}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", textDecoration: "none" }}
                >
                  <div style={{ width: "50px", height: "50px", borderRadius: "16px", background: action.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 4px 12px ${action.color}44` }}>
                    {action.icon}
                  </div>
                  <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{action.label}</span>
                </a>
              ))}
            </div>

            {/* Contact List */}
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "20px", overflow: "hidden", backdropFilter: "blur(10px)" }}>
              {contacts.map((contact, i) => (
                <div key={contact.id}>
                  <div style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>
                      {contact.avatar}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "15px", fontWeight: 600, color: "#fff" }}>{contact.name}</div>
                      <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>{contact.role}</div>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} aria-label={`Call ${contact.name}`} style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#34C759", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                        </a>
                      )}
                      {contact.whatsapp && (
                        <a href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${contact.name}`} style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                        </a>
                      )}
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} aria-label={`Email ${contact.name}`} style={{ width: "34px", height: "34px", borderRadius: "50%", background: "#5AC8FA", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        </a>
                      )}
                    </div>
                  </div>
                  {i < contacts.length - 1 && (
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", marginLeft: "72px" }} />
                  )}
                </div>
              ))}
            </div>

            {/* Address */}
            <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.06)", borderRadius: "16px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ color: "rgba(255,255,255,0.6)", flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "14px", color: "#fff", fontWeight: 500 }}>{settings.address}</div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.address)}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ fontSize: "12px", color: settings.colorPrimary, fontWeight: 600 }}
                >
                  Open in Maps →
                </a>
              </div>
            </div>

            {/* Social */}
            <div style={{ marginTop: "12px", display: "flex", gap: "10px", justifyContent: "center" }}>
              {settings.instagram && (
                <a href={sanitizeUrl(settings.instagram)} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 18px", background: "rgba(255,255,255,0.08)", borderRadius: "12px", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 500 }}>
                  📸 Instagram
                </a>
              )}
              {settings.facebook && (
                <a href={sanitizeUrl(settings.facebook)} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 18px", background: "rgba(255,255,255,0.08)", borderRadius: "12px", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 500 }}>
                  👍 Facebook
                </a>
              )}
            </div>
          </div>

          {/* Home Indicator */}
          <div style={{ padding: "8px 0 6px", display: "flex", justifyContent: "center", background: "#0D1B2A" }}>
            <div style={{ width: "120px", height: "4px", background: "rgba(255,255,255,0.25)", borderRadius: "2px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
