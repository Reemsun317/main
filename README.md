# Reemsun Commerce Map

Reemsun Commerce Map is a location-based Nigerian business discovery MVP. Buyers can search for products, stores, categories, streets, areas, and markets; view verified physical businesses; compare product prices; and contact vendors directly on WhatsApp.

This is intentionally not a full checkout marketplace. There is no cart, payment, escrow, delivery, wallet, in-app chat, or order tracking in this MVP.

## Features

- Search-first homepage with category shortcuts and featured verified businesses.
- Search results for businesses and products with category, location, verified-only, and price filters.
- Map page with Mapbox pins for approved businesses that have coordinates.
- Business profile pages with cover image, logo, verification badge, address, opening hours, catalog, WhatsApp, call, and directions buttons.
- WhatsApp product buying links with properly encoded prefilled messages.
- Vendor registration and dashboard UI for profile management, product creation, product editing, upload fields, and metric cards.
- Simple admin dashboard UI for approvals, verification status, vendor details, and metrics.
- Supabase schema, RLS policies, storage buckets, and seed data.
- Vercel-ready Next.js setup.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, PostgreSQL, Row Level Security, and Storage
- Mapbox GL JS
- Vercel deployment

## Install

```bash
npm install
```

## Configure Environment

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

If `NEXT_PUBLIC_MAPBOX_TOKEN` is missing, the map page shows a useful fallback list instead of failing.

## Configure Supabase

1. Create a Supabase project.
2. Enable email/password auth in Supabase Auth.
3. Run the migration in `supabase/migrations/001_initial_schema.sql`.
4. Run `supabase/seed.sql` to insert sample categories, businesses, and products.
5. Confirm these public storage buckets exist:
   - `business-images`
   - `product-images`

The migration creates tables for `profiles`, `categories`, `businesses`, `products`, and `leads`, plus RLS policies for public discovery, vendor ownership, admin access, and lead tracking.

## Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment To Vercel

1. Push the project to a Git provider.
2. Import the repository into Vercel.
3. Add the same environment variables from `.env.example`.
4. Deploy.
5. In Supabase Auth settings, add your Vercel domain to allowed redirect URLs.

## MVP Limitations

- No cart, checkout, payment, escrow, logistics, delivery tracking, wallet, reviews, or in-app chat.
- Vendor forms are UI-ready and Supabase-ready, but production persistence should connect form actions to Supabase inserts/uploads.
- WhatsApp click lead tracking table exists; production can insert into `leads` before redirecting.
- Search uses simple local sample data in the UI layer for this MVP scaffold. Replace the data adapter in `lib/data.ts` with Supabase queries when credentials are configured.

## Future Roadmap

Phase 1: Business discovery and product catalog  
Phase 2: Price comparison across stores and states  
Phase 3: Vendor subscription plans  
Phase 4: Order request system  
Phase 5: Escrow payment integration  
Phase 6: Logistics partner integration  
Phase 7: Full marketplace infrastructure
