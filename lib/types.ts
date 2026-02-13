// ============================================================
// Types — every piece of content comes from Airtable
// ============================================================

export interface FCEvent {
  id: string;
  title: string;
  date: string;
  endDate: string;
  description: string;
  location: string;
  imageUrl?: string;
  tags: string[];
  registrationUrl?: string;
  color: string;
  status: "Draft" | "Published";
}

export interface Program {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  imageUrl?: string;
  order: number;
}

export interface ContactPerson {
  id: string;
  name: string;
  role: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  avatar: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  album?: string;
  date?: string;
  order: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  order: number;
}

export interface Stat {
  id: string;
  number: string;
  label: string;
  order: number;
}

export interface InvolvementRole {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  ctaLabel: string;
  ctaUrl: string;
  order: number;
}

export interface DonateImpact {
  id: string;
  amount: string;
  description: string;
  order: number;
}

// ============================================================
// Site Settings — single-row "Site Settings" table in Airtable
// Staff edits one row to control the entire site.
// ============================================================

export interface SiteSettings {
  orgName: string;
  tagline: string;
  mission: string;
  heroBadge: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  donateUrl: string;
  donateHeadline: string;
  donateSubtitle: string;

  eventsLayout: "feed" | "grid";
  programsLayout: "feed" | "grid";
  galleryLayout: "feed" | "grid";

  showGallery: boolean;
  showStats: boolean;
  showTestimonials: boolean;
  showPrograms: boolean;

  colorPrimary: string;
  colorPrimaryLight: string;
  colorSecondary: string;
  colorAccent: string;

  donateAmounts: number[];
}
