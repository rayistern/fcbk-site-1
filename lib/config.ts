import type {
  SiteSettings,
  Stat,
  Testimonial,
  InvolvementRole,
  DonateImpact,
} from "./types";

// ============================================================
// Default fallbacks — ONLY used when Airtable is unreachable.
// In normal operation, every value comes from Airtable.
// ============================================================

export const DEFAULT_SETTINGS: SiteSettings = {
  orgName: "Friendship Circle Brooklyn",
  tagline: "Building a community where every child belongs",
  mission:
    "Friendship Circle Brooklyn pairs teen volunteers with children who have special needs, providing programs of socialization, inclusion, and support for the entire family.",
  heroBadge: "✨ Building Friendships Since 2011",
  phone: "+17185551234",
  whatsapp: "+17185551234",
  email: "info@fcbrooklyn.org",
  address: "527 Empire Blvd, Brooklyn, NY 11225",
  instagram: "https://instagram.com/fcbrooklyn",
  facebook: "https://facebook.com/fcbrooklyn",
  donateUrl: "",
  donateHeadline: "Make a Difference",
  donateSubtitle:
    "Every dollar brings a child closer to friendship, belonging, and joy.",
  eventsLayout: "feed",
  programsLayout: "grid",
  galleryLayout: "grid",
  showGallery: true,
  showStats: true,
  showTestimonials: true,
  showPrograms: true,
  colorPrimary: "#E8634A",
  colorPrimaryLight: "#FFF0ED",
  colorSecondary: "#1B2845",
  colorAccent: "#F5A623",
  donateAmounts: [18, 36, 72, 180, 360, 1000],
};

export const DEFAULT_STATS: Stat[] = [
  { id: "1", number: "350+", label: "Children Served", order: 1 },
  { id: "2", number: "200+", label: "Teen Volunteers", order: 2 },
  { id: "3", number: "50+", label: "Programs Per Year", order: 3 },
  { id: "4", number: "15", label: "Years of Impact", order: 4 },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote: "Friendship Circle changed our family's life. For the first time, my son has real friends who truly see him.",
    author: "Rachel M.",
    role: "Parent",
    order: 1,
  },
  {
    id: "2",
    quote: "Volunteering here taught me more about life than anything else. These kids inspire me every single week.",
    author: "Dina K.",
    role: "Teen Volunteer",
    order: 2,
  },
  {
    id: "3",
    quote: "The warmth and inclusion is unlike anything we've experienced. This community is extraordinary.",
    author: "David & Leah S.",
    role: "Parents",
    order: 3,
  },
];

export const DEFAULT_ROLES: InvolvementRole[] = [
  {
    id: "1",
    title: "Become a Volunteer",
    description: "Join 200+ teens making a difference every week. Earn community service hours while building lifelong friendships.",
    icon: "🙋",
    color: "#E8634A",
    ctaLabel: "Sign Up to Volunteer",
    ctaUrl: "https://wufoo.com/forms/volunteer-signup",
    order: 1,
  },
  {
    id: "2",
    title: "Enroll Your Child",
    description: "Register your child for our inclusive programs. Every child deserves friendship, fun, and belonging.",
    icon: "🧒",
    color: "#3498DB",
    ctaLabel: "Register Now",
    ctaUrl: "https://wufoo.com/forms/enrollment",
    order: 2,
  },
  {
    id: "3",
    title: "Sponsor a Program",
    description: "Your generosity powers our mission. Sponsor a specific program or event and see your impact firsthand.",
    icon: "💝",
    color: "#9B59B6",
    ctaLabel: "Sponsorship Info",
    ctaUrl: "https://wufoo.com/forms/sponsor",
    order: 3,
  },
  {
    id: "4",
    title: "Partner With Us",
    description: "Schools, organizations, and businesses — let's create impact together.",
    icon: "🤝",
    color: "#27AE60",
    ctaLabel: "Get in Touch",
    ctaUrl: "https://wufoo.com/forms/partnership",
    order: 4,
  },
];

export const DEFAULT_DONATE_IMPACTS: DonateImpact[] = [
  { id: "1", amount: "$18", description: "Supplies for one child's weekly activity", order: 1 },
  { id: "2", amount: "$72", description: "One month of Sunday Friends Club", order: 2 },
  { id: "3", amount: "$360", description: "Full holiday program sponsorship", order: 3 },
  { id: "4", amount: "$1,000", description: "Sponsor a child for an entire year", order: 4 },
];

// ISR revalidation interval
export const REVALIDATE = Number(process.env.REVALIDATE_INTERVAL) || 900;
