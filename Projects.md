# Universal Project Detail Page Schema (System Framework)

> **TARGET FILE:** `src/app/projects/[project-slug]/page.tsx`
> **ROLE:** AI System & UI/UX Architect
> **PURPOSE:** Use this template as the strict architectural guideline for ALL future project detail pages.

## 1. Page Configuration & Meta
*   **Route:** `/projects/[project-slug]`
*   **Framework:** Next.js (App Router)
*   **Mode:** `"use client"` (Client Component for Framer Motion)
*   **Theme:** Dark Mode Only (`bg-black`, `text-zinc-300`)
*   **Font:** `Inter` (Body) + `JetBrains Mono` (Metadata/Tags)

## 2. Layout Structure (Scrollytelling)
The page uses a **Sticky Sidebar + Scrollable Content** layout.

*   **Container:** `max-w-5xl mx-auto px-6` (Optimized for both readability and visual impact)
*   **Grid System:** `grid-cols-1 md:grid-cols-[180px_1fr]`
    *   **Left Column (180px):** Sticky Metadata (Role, Tech Stack, Key Metrics). Stays fixed while scrolling on Desktop. Hidden on Mobile.
    *   **Right Column (1fr):** Narrative Content (Problem, Solution, Impact).
    *   **Gap:** `gap-12 md:gap-24` (Generous spacing for "Senior UI" feel)

## 3. UI Components & Styling

### 3.1. Typography (Micro-Typography System)
*   **Hero H1:** `text-4xl md:text-7xl font-bold text-white tracking-tight leading-none`
*   **Hero H2 (Subtitle):** `text-2xl md:text-4xl font-medium text-zinc-500`
*   **Section Headers:** `text-2xl md:text-4xl font-bold text-white tracking-tight`
*   **Body Text:** `text-base leading-8 text-zinc-400 text-justify`
*   **Labels/Tags:** `text-xs font-bold tracking-wider uppercase font-mono`

### 3.2. Visual Elements
*   **Background:** `GridBackground` (Subtle 40px grid with radial fade).
*   **Cards/Containers:**
    *   Border: `border border-white/5`
    *   Background: `bg-zinc-900/20`
    *   Effect: `backdrop-blur-sm` (Glassmorphism)
    *   Radius: `rounded-xl` or `rounded-2xl`
*   **Icons:** `lucide-react` (Size `w-5 h-5`).

## 4. Content Schema (Data Distribution)

### 4.1. Hero Section (Header)
*   **Tags:** `[PROJECT TYPE]` | `[YEAR]` (Pill badges)
*   **Title:** `[ENGLISH PROJECT NAME]`
*   **Subtitle:** `[CHINESE PROJECT NAME]`
*   **Summary:** Short elevator pitch (max 2 lines).

### 4.2. Metadata Sidebar (Sticky)
*   **Role:** List of roles (e.g., Co-Founder, Product Owner).
*   **Tech Stack:** Array of tags (e.g., Next.js, Python, AI Agent).
*   **Key Metrics (Impact):**
    *   Display 2 key quantitative results.
    *   Format: Large Number (`text-xl font-mono text-emerald-400`) + Label (`text-[10px] uppercase`).

### 4.3. Narrative Sections (Article)
1.  **01_项目背景 (Context):**
    *   **Problem Statement:** Describe the core pain point or opportunity.
    *   **Visual:** 2-column grid of specific challenges/issues.
2.  **02_核心解决方案 (Core Solution - Part 1):**
    *   **Headline:** The main value proposition.
    *   **Media:** **Video/GIF** or **Image** showcasing the primary interface/interaction.
    *   **Caption:** Description of the visual.
3.  **03_进阶/后台解决方案 (Core Solution - Part 2):**
    *   **Headline:** Technical or B-side implementation details.
    *   **Media:** Secondary visual (Dashboard, Architecture Diagram, etc.).
    *   **Caption:** Description of the visual.
4.  **04_商业价值 (Impact):**
    *   **Headline:** "Business & Engineering Breakthroughs"
    *   **Content:** 2 Cards (e.g., Cost Reduction, User Growth, Efficiency Gain).

## 5. Navigation & Footer
*   **Top Nav:** Floating Glass Pill (`← 返回首页`).
*   **Footer:** Simple split layout.
    *   Left: `← 返回首页`
    *   Right: `下一个项目: [Next Project Name] →`

---
**Note to Agents:** When generating new project pages, strictly copy this structure but replace the *Content* and *Media Assets*. Maintain all CSS classes and layout primitives to ensure consistency across the entire portfolio.
