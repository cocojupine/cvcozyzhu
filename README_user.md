# Kesi Zhu - Product Portfolio & Resume Website

🔗 **GitHub Repository:** [https://github.com/cocojupine/CV_KesiZhu](https://github.com/cocojupine/CV_KesiZhu)

## 🤖 ATTENTION AI ASSISTANTS
This `README_user.md` acts as your master schema and architectural guideline. When asked to generate, refactor, or update code, **you MUST strictly adhere to the rules below.**

**CRITICAL DATA WORKFLOW:**
*   **Source of Truth:** `Main_page.md` (Root Directory). This file contains the latest text content (Hero, Skills, Experience, Projects).
*   **Implementation:** Do NOT import Markdown files at runtime. You must **manually sync** content from `Main_page.md` into the `content` object within `src/app/page.tsx`.
*   **Localization:** `src/app/page.tsx` handles both English (`EN`) and Chinese (`CN`) content. Ensure both keys are updated when `Main_page.md` changes.

---

## 🏗️ Architecture & Routing Logic (Hub & Spoke)

The website follows a "Hub & Spoke" conversion funnel:
1.  **The Hub (Main Page - `/src/app/page.tsx`):**
    *   A high-density "Dark Wireframe Mobile OS" Landing Page.
    *   **Components:** Hero, Skills (Bento Grid), Experience (Timeline), Projects (Cards), Footer.
    *   **State:** Uses React `useState` for Language Toggling (`CN` / `EN`). Default is `CN`.
2.  **The Spokes (Detail Pages):**
    *   Immersive standalone pages for specific case studies.
    *   **Current Pages:** `/projects/otters-home` (Otter's Home), `/projects/pilive` (PiLive).
    *   **Future Pages:** Additional selected projects as needed.
3.  **Interview View (`/src/app/interview`):**
    *   A hidden, evidence-led presentation route for interview conversations.
    *   It is intentionally absent from the public homepage navigation and carries `noindex, nofollow` metadata.
    *   The default surface supports a concise self-introduction; project evidence and the full experience archive open only as on-demand drawers.
4.  **Navigation:**
    *   **Dock:** A fixed bottom floating dock for quick contact actions (Phone, Email, LinkedIn, Resume).
    *   **Navbar:** Top fixed glass navbar for internal page navigation.

---

## 🎨 Design System & UI/UX Guidelines

*   **Visual Style:** "Dark Wireframe Mobile OS". High-tech, industrial, precision-engineered aesthetic.
*   **Theme:** Dark Mode Only. Deep dark backgrounds (`bg-black`, `bg-zinc-950`).
*   **Layout:** "Senior UI" Standard (Macro Scale).
    *   **Container:** `max-w-6xl` (Wide, spacious layout).
    *   **Spacing:** Generous gaps (`gap-16`, `gap-32`, `mb-32`) to create visual breathing room.
    *   **Padding:** Large touch targets (`p-8`, `p-10`).
*   **Typography:**
    *   **Primary (Sans):** `Inter` (via `next/font/google`). Used for headings and body.
        *   **Scale:** Hero H1 (`7xl/9xl`), Body (`text-xl`), Labels (`text-sm`).
        *   **Philosophy:** Big, Bold, Readable. No tiny text.
    *   **Secondary (Mono):** `JetBrains Mono`. Used for tags, metadata, and "code-like" UI elements.
*   **Project Cards:**
    *   **Aspect Ratio:** 3:2 for covers.
    *   **Visibility:** Full color, 100% opacity (No grayscale).
    *   **Interaction:** Subtle scale on hover.
*   **CSS Framework:** Tailwind CSS v4.
    *   **Custom Utilities:** `.glass-card`, `.glass-navbar` defined in `src/app/globals.css`.

---

## 📂 Directory Structure

```text
📦 CV_KesiZhu
 ┣ � Main_page.md           # 🧠 MASTER CONTENT: Edit this file to update website text!
 ┣ � README_user.md         # 🤖 SYSTEM INSTRUCTIONS: This file.
 ┣ 📂 public/                # 🖼️ ASSETS: Images, Videos, PDFs
 ┃ ┣ 📂 assets/              # Store all media here
 ┃ ┃ ┣ 📄 tatadajia_cover.png
 ┃ ┃ ┣ 📄 Pilive_cover.png
 ┃ ┃ ┗ ...
 ┣ 📂 src/                   # 💻 CODE: React Components
 ┃ ┣ 📂 app/
 ┃ ┃ ┣ 📄 globals.css        # Tailwind v4 theme & utilities
 ┃ ┃ ┣ 📄 layout.tsx         # Root layout with Fonts (Inter/JetBrains Mono)
 ┃ ┃ ┣ � page.tsx           # MAIN HUB: Landing Page (Contains 'content' object)
 ┃ ┃ ┣ 📂 interview/         # HIDDEN INTERVIEW VIEW: Intro + on-demand evidence
 ┃ ┃ ┗ 📂 projects/          # DETAIL SPOKES
 ┃ ┃   ┗ 📂 otters-home/     # Otter's Home Case Study
 ┃ ┃     ┗ 📄 page.tsx
 ┃ ┣ 📂 components/
 ┃ ┃ ┗ 📄 Navbar.tsx         # (Optional) Separate Navbar component
```

---

## 📝 Content Sync Instructions for Agents

1.  **Read** `Main_page.md` to understand the latest content requirements.
2.  **Locate** the `content` object in `src/app/page.tsx`.
3.  **Update** the `CN` (Chinese) section to strictly match `Main_page.md`.
4.  **Translate & Update** the `EN` (English) section to match the structure and meaning of the `CN` section.
5.  **Verify** that all links (e.g., `/projects/otters-home`) and assets (e.g., `/assets/image.png`) are correct and exist.
6.  **Do NOT** change layout or CSS classes unless explicitly requested; focus on the `content` data structure.
