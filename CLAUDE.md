# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js website for "Фантастичні Жінки" (Fantastic Women), a Ukrainian women's community organization based in Poltava. The site is built with Next.js 15, React 19, TypeScript, and uses Sanity CMS for content management.

## Development Commands

### Core Development
- `pnpm dev` - Start development server on localhost:3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Sanity Studio
The Sanity Studio is embedded at `/studio` route (app/studio/[[...tool]]/page.tsx). Access it at http://localhost:3000/studio during development.

## Architecture

### Tech Stack
- **Framework**: Next.js 15.2.4 with App Router
- **React**: Version 19
- **TypeScript**: Strict mode enabled
- **CMS**: Sanity (headless CMS)
- **Styling**: Tailwind CSS v4 with custom OKLCH color palette
- **UI Components**: Radix UI primitives with shadcn/ui ("new-york" style)
- **Email**: Resend API for contact form
- **Analytics**: Vercel Analytics

### Project Structure

```
app/
├── api/contact/route.ts    # Contact form API endpoint
├── studio/[[...tool]]/      # Sanity Studio embedded route
├── layout.tsx               # Root layout with metadata
├── page.tsx                 # Homepage (server component)
└── globals.css              # Global styles with CSS variables

components/
├── ui/                      # shadcn/ui components (Radix UI-based)
├── navigation.tsx           # Main navigation
├── hero-section.tsx
├── about-section.tsx
├── activities-section.tsx
├── events-section.tsx       # Client component with modal
├── contact-section.tsx
├── footer.tsx
└── event-modal.tsx          # Modal for event details

sanity/
├── env.ts                   # Environment variable helpers
├── lib/
│   ├── client.ts           # Sanity client configuration
│   ├── queries.ts          # GROQ queries
│   └── image.ts            # Image URL builder
├── schemaTypes/
│   ├── event.ts            # Event document type
│   └── index.ts
├── schemas/
│   └── pageSettings.ts     # Singleton for published events
└── structure.ts            # Custom Sanity Studio structure

types/
└── event.ts                # Event TypeScript interface
```

### Data Flow

1. **Content Management**: Events are created in Sanity Studio (/studio)
2. **Publishing Control**: Events must be added to "pageSettings" singleton to appear on the site
3. **Data Fetching**: Homepage uses `eventsQuery` to fetch published events from Sanity
4. **Rendering**: Events are passed to EventsSection (client component) for interactive display

### Sanity Schema Architecture

- **event**: Document type for individual events (title, date, time, location, image, etc.)
- **pageSettings**: Singleton document containing array of event references to control which events are published and their order

The separation between events and pageSettings allows editors to:
- Create draft events without publishing them
- Control the order of events on the homepage
- Easily unpublish events by removing them from publishedEvents array

### Key GROQ Query Pattern

```groq
*[_type == "pageSettings"][0] {
    "events": publishedEvents[]->{
        // ... event fields
    }
}
```

This fetches the singleton pageSettings document and resolves event references.

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset (usually "production")
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version (format: YYYY-MM-DD)
- `RESEND_API_KEY` - Resend API key for email
- `CONTACT_FORM_EMAIL_TO` - Recipient email for contact form

## Styling Conventions

- Uses Tailwind CSS v4 with CSS variables in OKLCH color space
- Custom color palette themed for Ukrainian women's community (soft lavender and pink tones)
- Theme provider configured for light mode by default (`enableSystem={false}`)
- Component styling follows shadcn/ui "new-york" style conventions
- Path alias `@/*` maps to project root for imports

## Important Configuration Notes

### Next.js Config (next.config.mjs)
- ESLint errors ignored during builds (`ignoreDuringBuilds: true`)
- TypeScript errors ignored during builds (`ignoreBuildErrors: true`)
- Images are unoptimized (`unoptimized: true`)

These settings allow faster development but should be reviewed before production deployment.

### TypeScript
- Strict mode enabled
- Target: ES6
- Path alias `@/*` configured for imports

## Component Patterns

### Server vs Client Components
- **Server Components**: page.tsx, layout.tsx (data fetching happens here)
- **Client Components**: navigation, events-section, event-modal, contact-section (interactive features)
- Use `"use client"` directive for components with hooks, event handlers, or browser APIs

### Animation Pattern
Components use IntersectionObserver for scroll-triggered animations. See events-section.tsx for reference implementation.

## Contact Form Flow

1. Client submits form to `/api/contact` POST endpoint
2. Server validates required fields (name, email, message)
3. Sends email via Resend API
4. Email uses reply-to header with user's email for easy responses

## Common Tasks

### Adding a New Schema Type to Sanity
1. Create schema file in `sanity/schemaTypes/`
2. Import and add to schema array in `sanity/schemaTypes/index.ts`
3. Update `sanity/structure.ts` if it needs custom positioning in Studio

### Adding New UI Components
Install shadcn/ui components via CLI (components.json is configured):
```bash
npx shadcn@latest add [component-name]
```

### Modifying Event Display
- Schema: `sanity/schemaTypes/event.ts`
- Query: `sanity/lib/queries.ts`
- Component: `components/events-section.tsx`
- Type: `types/event.ts`

## Localization

All content is in Ukrainian (uk). Metadata in app/layout.tsx includes Ukrainian keywords and Open Graph tags with locale set to "uk_UA".
