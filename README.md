# Friendship Circle Brooklyn — Website

Mobile-first community website built with Next.js + Airtable.  
**100% content-managed** — staff never touches code for day-to-day updates.

## One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Farrendy%2Ffcbk-site-1&env=AIRTABLE_API_KEY,AIRTABLE_BASE_ID&envDescription=Airtable%20credentials%20needed%20to%20connect%20your%20content.%20See%20README%20for%20setup%20instructions.&envLink=https%3A%2F%2Fgithub.com%2Farrendy%2Ffcb-website%23airtable-setup&project-name=fcbk-site-1&repository-name=fcbk-site-1)

Click the button above → it will:
1. Clone the repo to your GitHub
2. Prompt you for your Airtable API key and Base ID
3. Deploy to Vercel with a live URL in ~60 seconds

## Local Development

```bash
npm install
cp .env.local.example .env.local
# Fill in Airtable credentials
npm run dev
```

Works without Airtable too — falls back to sample data for development.

---

## Airtable Setup

Create a base with **8 tables**. Every piece of content on the site comes from here.

### 1. Site Settings *(single row — controls the entire site)*

| Field              | Type           | Example                                    |
| ------------------ | -------------- | ------------------------------------------ |
| Org Name           | Text           | Friendship Circle Brooklyn                 |
| Tagline            | Text           | Building a community where every child belongs |
| Mission            | Long text      | Friendship Circle Brooklyn pairs teen...   |
| Hero Badge         | Text           | ✨ Building Friendships Since 2011         |
| Phone              | Phone          | +17185551234                               |
| WhatsApp           | Phone          | +17185551234                               |
| Email              | Email          | info@fcbrooklyn.org                        |
| Address            | Text           | 527 Empire Blvd, Brooklyn, NY 11225        |
| Instagram          | URL            | https://instagram.com/fcbrooklyn           |
| Facebook           | URL            | https://facebook.com/fcbrooklyn            |
| Donate URL         | URL            | *(optional external donate link)*          |
| Donate Headline    | Text           | Make a Difference                          |
| Donate Subtitle    | Text           | Every dollar brings a child closer...      |
| Events Layout      | Single select  | feed / grid                                |
| Programs Layout    | Single select  | feed / grid                                |
| Gallery Layout     | Single select  | feed / grid                                |
| Show Gallery       | Checkbox       | ✓                                          |
| Show Stats         | Checkbox       | ✓                                          |
| Show Testimonials  | Checkbox       | ✓                                          |
| Show Programs      | Checkbox       | ✓                                          |
| Color Primary      | Text           | #E8634A                                    |
| Color Primary Light| Text           | #FFF0ED                                    |
| Color Secondary    | Text           | #1B2845                                    |
| Color Accent       | Text           | #F5A623                                    |
| Donate Amounts     | Text           | 18,36,72,180,360,1000                      |

### 2. Events

| Field             | Type             | Notes                                |
| ----------------- | ---------------- | ------------------------------------ |
| Name              | Text             | Event title                          |
| Date              | Date (with time) | Start date/time                      |
| End Date          | Date (with time) | End date/time                        |
| Description       | Long text        | Event description                    |
| Location          | Text             | Venue name                           |
| Image URL         | URL              | Dropbox share link                   |
| Tags              | Multiple select  | "Shabbat", "Family", "Holiday"       |
| Registration URL  | URL              | Wufoo form link                      |
| Color             | Text             | Hex color e.g. #E8634A               |
| Status            | Single select    | Draft / Published                    |

### 3. Contacts

| Field    | Type   | Notes                           |
| -------- | ------ | ------------------------------- |
| Name     | Text   | Person or department            |
| Role     | Text   | e.g. "Program Director"         |
| Phone    | Phone  | With country code               |
| WhatsApp | Phone  | With country code               |
| Email    | Email  |                                 |
| Avatar   | Text   | Emoji "👩" or Dropbox image URL |
| Order    | Number | Sort order (1, 2, 3...)         |

### 4. Programs

| Field       | Type      | Notes                |
| ----------- | --------- | -------------------- |
| Name        | Text      | Program name         |
| Description | Long text | Short description    |
| Icon        | Text      | Emoji e.g. "🤝"     |
| Color       | Text      | Hex color            |
| Image URL   | URL       | Optional Dropbox link|
| Order       | Number    | Sort order           |

### 5. Testimonials

| Field  | Type      | Notes              |
| ------ | --------- | ------------------ |
| Quote  | Long text | The testimonial    |
| Author | Text      | e.g. "Rachel M."  |
| Role   | Text      | e.g. "Parent"      |
| Order  | Number    | Sort order         |

### 6. Stats

| Field  | Type   | Notes                      |
| ------ | ------ | -------------------------- |
| Number | Text   | e.g. "350+" or "15"        |
| Label  | Text   | e.g. "Children Served"     |
| Order  | Number | Sort order                 |

### 7. Get Involved

| Field       | Type      | Notes                           |
| ----------- | --------- | ------------------------------- |
| Title       | Text      | e.g. "Become a Volunteer"       |
| Description | Long text | Card description                |
| Icon        | Text      | Emoji e.g. "🙋"                |
| Color       | Text      | Hex color                       |
| CTA Label   | Text      | Button text e.g. "Sign Up"      |
| CTA URL     | URL       | Wufoo form or external link     |
| Order       | Number    | Sort order                      |

### 8. Donate Impact

| Field       | Type      | Notes                           |
| ----------- | --------- | ------------------------------- |
| Amount      | Text      | e.g. "$18" or "$1,000"          |
| Description | Text      | e.g. "Supplies for one child"   |
| Order       | Number    | Sort order                      |

### Optional: 9. Gallery

| Field     | Type          | Notes             |
| --------- | ------------- | ----------------- |
| Image URL | URL           | Dropbox share link|
| Caption   | Text          | Photo caption     |
| Album     | Single select | Album name        |
| Date      | Date          | When taken        |
| Order     | Number        | Sort order        |

---

## What Staff Can Change Without Code

**Everything.** Here's the day-to-day workflow:

| Task                         | Where in Airtable             |
| ---------------------------- | ----------------------------- |
| Add/edit/remove an event     | Events table                  |
| Change org phone/email       | Site Settings row             |
| Add a team member to contact | Contacts table                |
| Update impact stats          | Stats table                   |
| Add a testimonial            | Testimonials table            |
| Change donate button amounts | Site Settings → Donate Amounts|
| Switch events to grid layout | Site Settings → Events Layout |
| Hide the stats section       | Site Settings → Show Stats ☐  |
| Change brand colors          | Site Settings → Color fields  |
| Add a volunteer signup card  | Get Involved table            |
| Update donate impact lines   | Donate Impact table           |

Changes appear on the site within ~15 minutes (ISR revalidation).

---

## Image Hosting with Dropbox

1. Drop images into a shared Dropbox folder
2. Right-click → **Copy link**
3. Paste into any **Image URL** field in Airtable
4. The site auto-converts the link to render properly

---

## Deploying to Vercel

**Easiest:** Use the [one-click deploy button](#one-click-deploy) at the top of this README.

**Manual:** Connect this GitHub repo to Vercel, then set these environment variables in the Vercel dashboard:

| Variable           | Required | Notes                          |
| ------------------ | -------- | ------------------------------ |
| AIRTABLE_API_KEY   | Yes      | Personal access token          |
| AIRTABLE_BASE_ID   | Yes      | Starts with `app`              |
| REVALIDATE_INTERVAL| No       | Default: 900 (15 min)          |
| NEXT_PUBLIC_SITE_URL| No      | Your production domain         |

---

## Architecture

```
app/
  layout.tsx              → Root layout + bottom nav
  page.tsx                → Home (fetches settings, events, programs, stats, testimonials)
  globals.css             → Theme + base styles
  events/page.tsx         → Events (fetches settings + events)
  get-involved/page.tsx   → Join page (fetches settings + roles + programs)
  donate/page.tsx         → Server wrapper (fetches settings + impacts)
  donate/DonateClient.tsx → Client component (amount picker)
  contact/page.tsx        → Phone-styled contact (fetches settings + contacts)

components/
  BottomNav.tsx           → Fixed bottom nav (client)
  EventCard.tsx           → Event card (feed/grid)
  SwipeCarousel.tsx       → Swipeable carousel (client)

lib/
  airtable.ts             → All data fetching (9 functions)
  config.ts               → Fallback defaults only
  images.ts               → Dropbox URL converter
  types.ts                → TypeScript interfaces
  utils.ts                → Date formatting, URL sanitization
```

Every page is a **server component** that calls Airtable at build/revalidation time. No API keys reach the browser. Client components are used only for interactivity (nav, carousel, donate picker).
