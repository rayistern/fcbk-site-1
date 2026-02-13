import Airtable from "airtable";
import type {
  FCEvent,
  Program,
  ContactPerson,
  GalleryItem,
  Testimonial,
  Stat,
  InvolvementRole,
  DonateImpact,
  SiteSettings,
} from "./types";
import { toDirectImageUrl } from "./images";
import {
  DEFAULT_SETTINGS,
  DEFAULT_STATS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_ROLES,
  DEFAULT_DONATE_IMPACTS,
} from "./config";

// ============================================================
// Airtable Client
//
// EVERY piece of content is fetched from Airtable.
// Defaults in config.ts are only used when Airtable is
// unreachable or not yet configured.
//
// All functions run server-side via ISR. Airtable rate limits
// are never an issue — we hit them at most once per revalidate.
// ============================================================

function getBase() {
  if (!process.env.AIRTABLE_API_KEY || !process.env.AIRTABLE_BASE_ID) {
    console.warn("⚠️  Airtable not configured. Using fallback data.");
    return null;
  }
  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
  );
}

function tbl(envKey: string, fallback: string): string {
  return process.env[envKey] || fallback;
}

// ============================================================
// SITE SETTINGS — single-row table
// ============================================================
// Airtable table: "Site Settings" with ONE row.
// Each field maps to a SiteSettings property.
//
// Fields:
//   Org Name, Tagline, Mission, Hero Badge, Phone, WhatsApp,
//   Email, Address, Instagram, Facebook, Donate URL,
//   Donate Headline, Donate Subtitle,
//   Events Layout (single select: feed/grid),
//   Programs Layout, Gallery Layout,
//   Show Gallery (checkbox), Show Stats, Show Testimonials,
//   Show Programs,
//   Color Primary, Color Primary Light, Color Secondary,
//   Color Accent,
//   Donate Amounts (text, comma-separated e.g. "18,36,72,180,360,1000")
// ============================================================

export async function getSiteSettings(): Promise<SiteSettings> {
  const base = getBase();
  if (!base) return DEFAULT_SETTINGS;

  try {
    const records = await base(tbl("AIRTABLE_SETTINGS_TABLE", "Site Settings"))
      .select({ maxRecords: 1 })
      .all();

    if (records.length === 0) return DEFAULT_SETTINGS;
    const r = records[0];

    const amountsRaw = (r.get("Donate Amounts") as string) || "";
    const amounts = amountsRaw
      .split(",")
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    return {
      orgName: (r.get("Org Name") as string) || DEFAULT_SETTINGS.orgName,
      tagline: (r.get("Tagline") as string) || DEFAULT_SETTINGS.tagline,
      mission: (r.get("Mission") as string) || DEFAULT_SETTINGS.mission,
      heroBadge: (r.get("Hero Badge") as string) || DEFAULT_SETTINGS.heroBadge,
      phone: (r.get("Phone") as string) || DEFAULT_SETTINGS.phone,
      whatsapp: (r.get("WhatsApp") as string) || DEFAULT_SETTINGS.whatsapp,
      email: (r.get("Email") as string) || DEFAULT_SETTINGS.email,
      address: (r.get("Address") as string) || DEFAULT_SETTINGS.address,
      instagram: (r.get("Instagram") as string) || DEFAULT_SETTINGS.instagram,
      facebook: (r.get("Facebook") as string) || DEFAULT_SETTINGS.facebook,
      donateUrl: (r.get("Donate URL") as string) || "",
      donateHeadline:
        (r.get("Donate Headline") as string) || DEFAULT_SETTINGS.donateHeadline,
      donateSubtitle:
        (r.get("Donate Subtitle") as string) || DEFAULT_SETTINGS.donateSubtitle,
      eventsLayout:
        ((r.get("Events Layout") as string)?.toLowerCase() as "feed" | "grid") ||
        DEFAULT_SETTINGS.eventsLayout,
      programsLayout:
        ((r.get("Programs Layout") as string)?.toLowerCase() as "feed" | "grid") ||
        DEFAULT_SETTINGS.programsLayout,
      galleryLayout:
        ((r.get("Gallery Layout") as string)?.toLowerCase() as "feed" | "grid") ||
        DEFAULT_SETTINGS.galleryLayout,
      showGallery: r.get("Show Gallery") !== undefined
        ? !!(r.get("Show Gallery"))
        : DEFAULT_SETTINGS.showGallery,
      showStats: r.get("Show Stats") !== undefined
        ? !!(r.get("Show Stats"))
        : DEFAULT_SETTINGS.showStats,
      showTestimonials: r.get("Show Testimonials") !== undefined
        ? !!(r.get("Show Testimonials"))
        : DEFAULT_SETTINGS.showTestimonials,
      showPrograms: r.get("Show Programs") !== undefined
        ? !!(r.get("Show Programs"))
        : DEFAULT_SETTINGS.showPrograms,
      colorPrimary:
        (r.get("Color Primary") as string) || DEFAULT_SETTINGS.colorPrimary,
      colorPrimaryLight:
        (r.get("Color Primary Light") as string) || DEFAULT_SETTINGS.colorPrimaryLight,
      colorSecondary:
        (r.get("Color Secondary") as string) || DEFAULT_SETTINGS.colorSecondary,
      colorAccent:
        (r.get("Color Accent") as string) || DEFAULT_SETTINGS.colorAccent,
      donateAmounts:
        amounts.length > 0 ? amounts : DEFAULT_SETTINGS.donateAmounts,
    };
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return DEFAULT_SETTINGS;
  }
}

// ============================================================
// EVENTS
// ============================================================
// Fields: Name, Date, End Date, Description, Location,
//   Image URL, Tags (multi select), Registration URL,
//   Color, Status (Draft/Published)
// ============================================================

export async function getUpcomingEvents(): Promise<FCEvent[]> {
  const base = getBase();
  if (!base) return getFallbackEvents();

  try {
    const now = new Date().toISOString();
    const records = await base(tbl("AIRTABLE_EVENTS_TABLE", "Events"))
      .select({
        filterByFormula: `AND({Status} = "Published", IS_AFTER({Date}, "${now}"))`,
        sort: [{ field: "Date", direction: "asc" }],
      })
      .all();

    return records.map((r) => ({
      id: r.id,
      title: (r.get("Name") as string) || "",
      date: (r.get("Date") as string) || "",
      endDate: (r.get("End Date") as string) || "",
      description: (r.get("Description") as string) || "",
      location: (r.get("Location") as string) || "",
      imageUrl: toDirectImageUrl(r.get("Image URL") as string),
      tags: (r.get("Tags") as string[]) || [],
      registrationUrl: (r.get("Registration URL") as string) || "",
      color: (r.get("Color") as string) || "#E8634A",
      status: "Published" as const,
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return getFallbackEvents();
  }
}

// ============================================================
// PROGRAMS
// ============================================================
// Fields: Name, Description, Icon, Color, Image URL, Order
// ============================================================

export async function getPrograms(): Promise<Program[]> {
  const base = getBase();
  if (!base) return getFallbackPrograms();

  try {
    const records = await base("Programs")
      .select({ sort: [{ field: "Order", direction: "asc" }] })
      .all();

    return records.map((r) => ({
      id: r.id,
      title: (r.get("Name") as string) || "",
      description: (r.get("Description") as string) || "",
      icon: (r.get("Icon") as string) || "🤝",
      color: (r.get("Color") as string) || "#E8634A",
      imageUrl: toDirectImageUrl(r.get("Image URL") as string),
      order: (r.get("Order") as number) || 0,
    }));
  } catch (error) {
    console.error("Error fetching programs:", error);
    return getFallbackPrograms();
  }
}

// ============================================================
// CONTACTS
// ============================================================
// Fields: Name, Role, Phone, WhatsApp, Email, Avatar, Order
// ============================================================

export async function getContacts(): Promise<ContactPerson[]> {
  const base = getBase();
  if (!base) return getFallbackContacts();

  try {
    const records = await base(tbl("AIRTABLE_CONTACTS_TABLE", "Contacts"))
      .select({ sort: [{ field: "Order", direction: "asc" }] })
      .all();

    return records.map((r) => ({
      id: r.id,
      name: (r.get("Name") as string) || "",
      role: (r.get("Role") as string) || "",
      phone: (r.get("Phone") as string) || "",
      whatsapp: (r.get("WhatsApp") as string) || "",
      email: (r.get("Email") as string) || "",
      avatar: (r.get("Avatar") as string) || "👤",
      order: (r.get("Order") as number) || 0,
    }));
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return getFallbackContacts();
  }
}

// ============================================================
// GALLERY
// ============================================================
// Fields: Image URL, Caption, Album, Date, Order
// ============================================================

export async function getGallery(): Promise<GalleryItem[]> {
  const base = getBase();
  if (!base) return [];

  try {
    const records = await base(tbl("AIRTABLE_GALLERY_TABLE", "Gallery"))
      .select({ sort: [{ field: "Order", direction: "asc" }] })
      .all();

    return records.map((r) => ({
      id: r.id,
      imageUrl: toDirectImageUrl(r.get("Image URL") as string),
      caption: (r.get("Caption") as string) || "",
      album: (r.get("Album") as string) || "",
      date: (r.get("Date") as string) || "",
      order: (r.get("Order") as number) || 0,
    }));
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return [];
  }
}

// ============================================================
// TESTIMONIALS
// ============================================================
// Fields: Quote, Author, Role, Order
// ============================================================

export async function getTestimonials(): Promise<Testimonial[]> {
  const base = getBase();
  if (!base) return DEFAULT_TESTIMONIALS;

  try {
    const records = await base("Testimonials")
      .select({ sort: [{ field: "Order", direction: "asc" }] })
      .all();

    if (records.length === 0) return DEFAULT_TESTIMONIALS;

    return records.map((r) => ({
      id: r.id,
      quote: (r.get("Quote") as string) || "",
      author: (r.get("Author") as string) || "",
      role: (r.get("Role") as string) || "",
      order: (r.get("Order") as number) || 0,
    }));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return DEFAULT_TESTIMONIALS;
  }
}

// ============================================================
// STATS
// ============================================================
// Fields: Number (text, e.g. "350+"), Label, Order
// ============================================================

export async function getStats(): Promise<Stat[]> {
  const base = getBase();
  if (!base) return DEFAULT_STATS;

  try {
    const records = await base("Stats")
      .select({ sort: [{ field: "Order", direction: "asc" }] })
      .all();

    if (records.length === 0) return DEFAULT_STATS;

    return records.map((r) => ({
      id: r.id,
      number: (r.get("Number") as string) || "",
      label: (r.get("Label") as string) || "",
      order: (r.get("Order") as number) || 0,
    }));
  } catch (error) {
    console.error("Error fetching stats:", error);
    return DEFAULT_STATS;
  }
}

// ============================================================
// GET INVOLVED ROLES
// ============================================================
// Fields: Title, Description, Icon, Color, CTA Label,
//   CTA URL, Order
// ============================================================

export async function getInvolvementRoles(): Promise<InvolvementRole[]> {
  const base = getBase();
  if (!base) return DEFAULT_ROLES;

  try {
    const records = await base("Get Involved")
      .select({ sort: [{ field: "Order", direction: "asc" }] })
      .all();

    if (records.length === 0) return DEFAULT_ROLES;

    return records.map((r) => ({
      id: r.id,
      title: (r.get("Title") as string) || "",
      description: (r.get("Description") as string) || "",
      icon: (r.get("Icon") as string) || "🤝",
      color: (r.get("Color") as string) || "#E8634A",
      ctaLabel: (r.get("CTA Label") as string) || "Learn More",
      ctaUrl: (r.get("CTA URL") as string) || "#",
      order: (r.get("Order") as number) || 0,
    }));
  } catch (error) {
    console.error("Error fetching involvement roles:", error);
    return DEFAULT_ROLES;
  }
}

// ============================================================
// DONATE IMPACT LINES
// ============================================================
// Fields: Amount (text, e.g. "$18"), Description, Order
// ============================================================

export async function getDonateImpacts(): Promise<DonateImpact[]> {
  const base = getBase();
  if (!base) return DEFAULT_DONATE_IMPACTS;

  try {
    const records = await base("Donate Impact")
      .select({ sort: [{ field: "Order", direction: "asc" }] })
      .all();

    if (records.length === 0) return DEFAULT_DONATE_IMPACTS;

    return records.map((r) => ({
      id: r.id,
      amount: (r.get("Amount") as string) || "",
      description: (r.get("Description") as string) || "",
      order: (r.get("Order") as number) || 0,
    }));
  } catch (error) {
    console.error("Error fetching donate impacts:", error);
    return DEFAULT_DONATE_IMPACTS;
  }
}

// ============================================================
// FALLBACK DATA — development / Airtable-unconfigured mode
// ============================================================

function getFallbackEvents(): FCEvent[] {
  return [
    {
      id: "1",
      title: "Friendship Shabbat Party",
      date: new Date(Date.now() + 7 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 7 * 86400000 + 9000000).toISOString(),
      description: "Join us for a beautiful Shabbat celebration with music, crafts, candle lighting, and a delicious dinner.",
      location: "FC Brooklyn Center",
      tags: ["Shabbat", "Family"],
      registrationUrl: "#",
      color: "#E8634A",
      status: "Published",
    },
    {
      id: "2",
      title: "Purim Carnival Extravaganza",
      date: new Date(Date.now() + 14 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 14 * 86400000 + 14400000).toISOString(),
      description: "Our biggest event of the year! Games, prizes, costumes, bounce houses, face painting, and so much more.",
      location: "Brooklyn Community Hall",
      tags: ["Holiday", "Carnival"],
      registrationUrl: "#",
      color: "#9B59B6",
      status: "Published",
    },
    {
      id: "3",
      title: "Sunday Friends Club",
      date: new Date(Date.now() + 3 * 86400000).toISOString(),
      endDate: new Date(Date.now() + 3 * 86400000 + 9000000).toISOString(),
      description: "Weekly hangout where teen volunteers and their special friends enjoy arts, music, sports, and snacks.",
      location: "FC Brooklyn Center",
      tags: ["Weekly", "Club"],
      registrationUrl: "#",
      color: "#3498DB",
      status: "Published",
    },
  ];
}

function getFallbackPrograms(): Program[] {
  return [
    { id: "1", title: "Sunday Friends Club", description: "Weekly social hangouts pairing teen volunteers with special friends", icon: "🤝", color: "#3498DB", order: 1 },
    { id: "2", title: "Holiday Programs", description: "Inclusive celebrations for every Jewish holiday", icon: "🕎", color: "#9B59B6", order: 2 },
    { id: "3", title: "Summer Camp", description: "An unforgettable summer experience for children of all abilities", icon: "☀️", color: "#F39C12", order: 3 },
    { id: "4", title: "Family Support", description: "Resources, respite, and community for the whole family", icon: "💛", color: "#27AE60", order: 4 },
    { id: "5", title: "Teen Leadership", description: "Empowering teens to become compassionate community leaders", icon: "⭐", color: "#E8634A", order: 5 },
    { id: "6", title: "Birthday Circle", description: "Every child deserves an amazing birthday celebration", icon: "🎂", color: "#E91E63", order: 6 },
  ];
}

function getFallbackContacts(): ContactPerson[] {
  return [
    { id: "1", name: "Main Office", role: "General Inquiries", phone: "+17185551234", whatsapp: "+17185551234", email: "info@fcbrooklyn.org", avatar: "🏢", order: 1 },
    { id: "2", name: "Sarah Goldman", role: "Program Director", phone: "+17185551235", whatsapp: "+17185551235", email: "sarah@fcbrooklyn.org", avatar: "👩", order: 2 },
    { id: "3", name: "Rivky Levin", role: "Volunteer Coordinator", phone: "+17185551236", whatsapp: "+17185551236", email: "rivky@fcbrooklyn.org", avatar: "👩‍🦰", order: 3 },
    { id: "4", name: "Mendel Katz", role: "Events & Outreach", phone: "+17185551237", whatsapp: "+17185551237", email: "mendel@fcbrooklyn.org", avatar: "👨", order: 4 },
  ];
}
