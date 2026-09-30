# 🦊 Dark Fox - Next.js & Supabase Web App

A modern, high-performance web application built with Next.js 15, Tailwind CSS, TypeScript, and Supabase.

---

## ✨ Features

- 🦊 **Dark Fox Cyber Theme**: Obsidian black canvas with neon orange, violet, and amber glow accents.
- 🔐 **Multiple Authentication Methods**:
  - **Google OAuth Login**: Direct 1-click Google authentication via Supabase.
  - **Facebook OAuth Login**: Direct 1-click Facebook authentication via Supabase.
  - **Custom User ID & Password**: Register and log in using a custom handle (e.g. `dark_fox_007`) and password.
  - **Custom Guest Pass / Login**: Create a custom Guest User ID & Password to explore or jump in instantly.
- ⚡ **Supabase Live & Demo Fallback**: Works out of the box locally in demo mode, and seamlessly switches to live PostgreSQL & OAuth when your Supabase keys are provided.
- 🚀 **Vercel Deployment Ready**: Pre-configured App Router, dynamic server routes, and environment variable support.
- 🐙 **GitHub Ready**: Clean git tree and `.gitignore`.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Auth & Database**: Supabase (`@supabase/ssr` & `@supabase/supabase-js`)
- **Deployment**: Vercel

---

## 🚀 Quick Start (Local Development)

1. Navigate to the project directory:
   ```bash
   cd dark-fox
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Connecting Supabase (Google & Facebook Login)

1. Create a free project at [supabase.com](https://supabase.com).
2. In your Supabase Dashboard, go to **Project Settings > API**.
3. Copy **Project URL** and **anon public Key**.
4. Create a `.env.local` file in the root of `dark-fox`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. **Enable Google Provider**:
   - In Supabase, go to **Authentication > Providers > Google**.
   - Paste your Google Cloud OAuth Client ID & Client Secret.
6. **Enable Facebook Provider**:
   - In Supabase, go to **Authentication > Providers > Facebook**.
   - Paste your Meta Developer App ID & App Secret.
7. Add your Redirect URL in Supabase Auth Settings:
   - `http://localhost:3000/auth/callback` (Local)
   - `https://your-vercel-app.vercel.app/auth/callback` (Production)

---

## 🐙 Pushing to GitHub

1. Create a new repository on [GitHub](https://github.com/new) named `dark-fox`.
2. In your terminal, run:
   ```bash
   git init
   git add .
   git commit -m "feat: initial Dark Fox auth platform with Google, Facebook, Custom ID, and Guest Login"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/dark-fox.git
   git push -u origin main
   ```

---

## 🔺 Deploying to Vercel

1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import your `dark-fox` GitHub repository.
3. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**. Your app is now live!
