# Kesi Zhu - Product Portfolio & Resume Website

🔗 **GitHub Repository:** [https://github.com/cocojupine/CV_KesiZhu](https://github.com/cocojupine/CV_KesiZhu)

## 🤖 ATTENTION AI ASSISTANTS
This `README.md` acts as your master schema and architectural guideline. When asked to generate, refactor, or update code in this repository, **you MUST strictly adhere to the rules, tech stack, and design systems defined below.** Do NOT hardcode content directly into React components. Always read from and write to the designated data files (TXT/MDX/JSON).

---

## 🏗️ Tech Stack & Architecture

* **Framework:** Next.js (React) with App Router (`/src/app`)
* **Styling:** Tailwind CSS
* **Architecture Pattern:** Content as Data (Data-Driven UI). All text, tags, and image paths are stored in `/content` and injected into UI components dynamically.
* **Deployment:** Vercel (CI/CD integrated)

---

## 🎨 Design System & UI/UX Guidelines

The website follows a modern, tech-forward **Dark Mode Bento Box** aesthetic, inspired by high-end SaaS and AI product landing pages.

* **Theme:** Dark Mode Only.
* **Backgrounds:** Deep dark gradients or solid dark shades (e.g., `bg-zinc-950` or `bg-[#0a0a0a]`).
* **Card UI (Bento Box):** * Use Glassmorphism / Frosted glass effects for cards: `bg-white/5 backdrop-blur-lg border border-white/10`.
    * Large, smooth rounded corners: `rounded-2xl` or `rounded-3xl`.
    * Subtle hover effects for interactability: `hover:-translate-y-1 hover:border-white/20 transition-all duration-300`.
* **Typography:** Clean sans-serif (Inter or system UI). High contrast for primary text (`text-zinc-100`), subdued for secondary text (`text-zinc-400`).
* **Tags/Badges:** Pill-shaped capsules for skills and tech stacks (`rounded-full px-3 py-1 text-sm`). Color-code them subtly based on category (e.g., AI Engineering gets a subtle purple tint, Product gets blue).

---

## 📂 Directory Structure

```text
📦 CV_KesiZhu
 ┣ 📂 content/               # 🧠 MASTER DATA: AI must read/update content here
 ┃ ┣ 📄 main_page.txt        # Hero Slogan & Basic Info
 ┃ ┣ 📄 skills.txt           # Bento Box skill tags and proof of work
 ┃ ┣ 📂 projects/            # Detailed case studies (MDX or TXT)
 ┃ ┃ ┣ 📄 pilive.mdx
 ┃ ┃ ┗ 📄 otters-home.mdx
 ┃ ┗ 📂 experience/          # Work history data
 ┣ 📂 public/                # 🖼️ ASSETS: Images, GIFs, WebM, PDF resume
 ┃ ┣ 📂 assets/
 ┃ ┃ ┣ 🖼️ project-b1ab8265...jpg  # C-end mobile UI for Otter's Home
 ┃ ┃ ┣ 🖼️ tatadajia_web.jpg       # B-end SaaS UI for Otter's Home
 ┃ ┃ ┗ 🎞️ pilive-demo.webm        # Interactive AI demo
 ┃ ┗ 📄 CV_KesiZhu.pdf
 ┣ 📂 src/                   # 💻 CODE: React Components & Logic
 ┃ ┣ 📂 app/                 # Next.js Pages (Hero, About, Dynamic Project Pages)
 ┃ ┣ 📂 components/
 ┃ ┃ ┣ 📂 ui/                # Reusable atoms (Buttons, Badges, Cards)
 ┃ ┃ ┗ 📂 sections/          # Page blocks (HeroSection, BentoSkills, ProjectGrid)
 ┃ ┗ 📂 lib/                 # Utility functions for parsing content files
 ┗ 📄 tailwind.config.ts     # Tailwind theme definitions
📝 Content Schema & Maintenance Guide
How to update Skills (AI Instruction)
When asked to add a new skill, parse /content/skills.txt. The format is:

Plaintext
### [Module Name]
[标签] Tag1 / Tag2 / Tag3
[落地场景] ↳ The concrete business impact and context.
AI Action: Parse this text, split tags by /, and render them inside a <Card> using the <Badge> component. Render the [落地场景] as secondary text (text-sm text-gray-400).

How to update Projects (AI Instruction)
When rendering a project card or detail page (e.g., PiLive, Otter's Home), follow the Context - Solution - Impact structure.

Images: Always use relative paths from the public/ directory (e.g., /assets/tatadajia_web.jpg). Ensure images maintain a polished aspect ratio (object-cover or object-contain depending on the mockup context).

Data Structure: Look for tags like [角色], [标签], and [背书] in the project files to populate the card headers.
