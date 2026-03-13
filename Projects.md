# Otter's Home Project Detail Page Schema (System Framework)

> **TARGET FILE:** `src/app/projects/otters-home/page.tsx`
> **ROLE:** AI System & UI/UX Architect

## 1. Page Configuration & Meta
*   **Route:** `/projects/otters-home`
*   **Framework:** Next.js (App Router)
*   **Mode:** `"use client"` (Client Component for Framer Motion)
*   **Theme:** Dark Mode Only (`bg-black`, `text-zinc-300`)
*   **Font:** `Inter` (Body) + `JetBrains Mono` (Metadata/Tags)

## 2. Layout Structure (Scrollytelling)
The page uses a **Sticky Sidebar + Scrollable Content** layout.

*   **Container:** `max-w-3xl mx-auto px-6` (Centered, readable width)
*   **Grid System:** `grid-cols-1 md:grid-cols-[140px_1fr]`
    *   **Left Column (140px):** Sticky Metadata (Role, Tech Stack, Key Metrics). Stays fixed while scrolling on Desktop. Hidden on Mobile.
    *   **Right Column (1fr):** Narrative Content (Problem, Solution, Impact).

## 3. UI Components & Styling

### 3.1. Typography (Micro-Typography System)
*   **Hero H1:** `text-3xl md:text-5xl font-bold text-white tracking-tight`
*   **Hero H2 (Subtitle):** `text-xl md:text-3xl font-medium text-zinc-500`
*   **Section Headers:** `text-xl md:text-2xl font-bold text-white tracking-tight`
*   **Body Text:** `text-sm leading-7 text-zinc-400 text-justify`
*   **Labels/Tags:** `text-[9px] font-bold tracking-widest uppercase font-mono`

### 3.2. Visual Elements
*   **Background:** `GridBackground` (Subtle 40px grid with radial fade).
*   **Cards/Containers:**
    *   Border: `border border-white/5`
    *   Background: `bg-zinc-900/20`
    *   Effect: `backdrop-blur-sm` (Glassmorphism)
*   **Icons:** `lucide-react` (Size `w-3.5 h-3.5` or `w-4 h-4`).

## 4. Content Schema (Data Distribution)

### 4.1. Hero Section (Header)
*   **Tags:** `B2B2C SAAS` | `2023 - 2024` (Pill badges)
*   **Title:** "OTTER'S HOME" (English)
*   **Subtitle:** "AI 室内设计" (Chinese)
*   **Summary:** Short elevator pitch (max 2 lines).

### 4.2. Metadata Sidebar (Sticky)
*   **Role:** List of roles (e.g., Co-Founder, Product Owner).
*   **Tech Stack:** Array of tags (Stable Diffusion, Next.js, etc.).
*   **Key Metrics (Impact):**
    *   Metric 1: `-70%` (Production Cost)
    *   Metric 2: `27+` (B-End Clients)

### 4.3. Narrative Sections (Article)
1.  **01_项目背景 (Context):**
    *   Problem Statement: "The gap between inspiration and reality."
    *   Visual: 2-column grid of pain points (High Cost vs. Fake Assets).
2.  **02_C端解决方案 (C-End Solution):**
    *   Headline: "1-minute WYSIWYG."
    *   Media: **Video/GIF** of Mobile App Interaction (`tatadajia_phone.webm`).
    *   Caption: "Live Demo • Mobile Interface".
3.  **03_B端解决方案 (B-End Solution):**
    *   Headline: "SaaS Asset Management."
    *   Media: **Image** of Web Dashboard (`tatadajia_web.png`).
    *   Caption: "Merchant Dashboard".
4.  **04_商业价值 (Impact):**
    *   Headline: "Engineering & Business Breakthroughs."
    *   Content: 2 Cards (Engineering Cost Reduction + Business Verification).

## 5. Navigation & Footer
*   **Top Nav:** Floating Glass Pill (`Back to Home`).
*   **Footer:** Simple split layout.
    *   Left: `← 返回首页`
    *   Right: `Next Project: PiLive →`

---
**Note to Agents:** When generating new project pages, strictly copy this structure but replace the *Content* and *Media Assets*. Maintain all CSS classes and layout primitives.
