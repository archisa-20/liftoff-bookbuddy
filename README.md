## BookBuddy — Digital Library Starter

Modern digital library starter with authentication, protected routes, pricing, and a mock/real payment flow. Built with Vite, React, TypeScript, shadcn-ui, and Tailwind CSS.

### Features

- Email/password authentication with Supabase integration
- Mock authentication mode for local prototyping (no external services required)
- Protected routes via a `ProtectedRoute` component
- Pricing page with plan selection and a payment modal
- Mock payment flow that marks users as Pro and redirects to a success page
- Stripe Payment Links support for production checkout
- Account page and basic dashboard
- Responsive UI powered by shadcn-ui and Tailwind CSS

### Tech Stack

- Vite
- React
- TypeScript
- shadcn-ui
- Tailwind CSS

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```sh
git clone <REPO_URL>
cd <PROJECT_DIR>
npm install
```

### Development

Run the dev server:

```sh
npm run dev
```

Open the app at `http://localhost:8081/`.

Key routes:
- `/login`, `/signup` — auth pages
- `/dashboard` — protected (requires login)
- `/pricing` — plans and payment modal
- `/pricing/success` — success page

---

## Environment Variables

Create a `.env` file (see `.env.example` if present):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_STRIPE_LINK_BASIC=
VITE_STRIPE_LINK_PRO=
VITE_STRIPE_LINK_TEAM=
```

Notes:
- If `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY` are missing, the app automatically falls back to Mock Auth mode using `localStorage`.
- Stripe Payment Links are optional in development; the pricing page will function with the mock flow.

---

## Authentication

This project supports two modes:

1) Mock Auth (default when Supabase env vars are not set)
- Sign up and login are stored in `localStorage`.
- Demo credentials for quick testing:
  - Email: `demo@bookbuddy.test`
  - Password: `demo1234`
- Payment in mock mode simply marks the current user as Pro and redirects to `/pricing/success`.

2) Supabase Auth
- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- Email/password authentication is handled by Supabase.
- Profiles are stored in `public.profiles` and linked to `auth.users`.

### Supabase Setup

1. Create a Supabase project and copy the URL and anon key into your `.env`.
2. Create table `profiles` with RLS and policies for user-owned access:

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_pro boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;
create policy "profiles_select_own" on public.profiles for select using ( auth.uid() = id );
create policy "profiles_update_own" on public.profiles for update using ( auth.uid() = id );
create policy "profiles_insert_own" on public.profiles for insert with check ( auth.uid() = id );
```

---

## Payments

### Mock Payment (development)
- The pricing modal processes a “fake” payment and updates `profiles.is_pro = true` in local storage.
- Redirects to `/pricing/success`.

### Stripe Payment Links (production)
- Create Payment Links in your Stripe dashboard for each plan.
- Add the link URLs to your `.env`:

```
VITE_STRIPE_LINK_BASIC=
VITE_STRIPE_LINK_PRO=
VITE_STRIPE_LINK_TEAM=
```

- Set the success URL to your deployed `/pricing/success`.
- To mark users as Pro after payment, implement a webhook (e.g., Supabase Edge Function) that verifies the event and updates `profiles.is_pro = true` for the correct user.

High-level webhook outline:

```ts
// Verify Stripe signature
// Identify the user (via customer email or metadata)
// Use Supabase admin client to: update public.profiles set is_pro = true where id = <user_id>
```

---

## Production Build & Deployment

Build the app:

```sh
npm run build
```

Preview the production build locally:

```sh
npm run preview
```

You can deploy the `dist/` folder to any static hosting provider (e.g., Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, GitHub Pages). Ensure environment variables are provided at build/runtime as required by your host.

---

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview the production build locally

---

## License

MIT
