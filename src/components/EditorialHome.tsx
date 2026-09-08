"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, Linkedin, Mail, Menu, Smartphone, X } from "lucide-react";
import FolderIntroPrototype from "@/components/FolderIntroPrototype";
import PaperHero from "@/components/PaperHero";

type Lang = "EN" | "CN";
type Props = { content: Record<Lang, any> };

const copy = {
  CN: {
    issue: "个人网站 / 精简版 03",
    nav: [["经历", "#experience"], ["项目", "#projects"], ["方法", "#approach"]],
    eyebrow: "AI PRODUCT / 0→1 / EVALUATION",
    name: "祝可思",
    personalNote: { title: "一点日常", nowLabel: "最近在折腾：", now: "黑客松", interestsLabel: "兴趣：", interests: "Jpop、音乐剧、旅游" },
    statement: "AI 产品经理，做过企业级生成评估、0→1 创业产品与复杂 B 端系统。我擅长把模型能力变成可衡量、可迭代、能落地的产品。",
    facts: [["5个", "AI个人项目"], ["3篇", "EI / IEEE 论文"], ["20+", "奖项与认可"], ["5次", "产品实践经历"]],
    scroll: "查看经历与项目",
    experienceLabel: "EXPERIENCE / IMPACT",
    experienceTitle: "工作经历",
    experienceNote: "五段实践让我先看见真实业务的约束，再决定技术如何创造价值。",
    projectsLabel: "SELECTED WORK / PROOF",
    projectsTitle: "项目与可验证成果",
    projectsNote: "用真实产品、原型与结果说明能力，而不是依赖自我评价。",
    proofs: ["产品架构 / 商业验证", "决策设计 / AI 工作流", "AI Flow / 跨文化协作", "主动学习 / AI Engineering", "创意原型 / 独立实现"],
    approachLabel: "HOW I WORK / ONE SYSTEM",
    approachTitle: "把不确定性，变成可验证的产品路径",
    approachNote: "一套贯穿需求、原型、评估与交付的工作方法。",
    method: [
      ["01", "定义真实问题", "明确用户、场景与成功标准"],
      ["02", "快速建立证据", "用原型、数据和访谈降低不确定性"],
      ["03", "显性化约束", "同时衡量质量、成本与协作复杂度"],
      ["04", "形成迭代闭环", "用可复现标准持续改进产品"],
    ],
    toolkit: "能力工具箱",
    contactLabel: "AVAILABLE FOR PRODUCT WORK",
    contactTitle: "寻找 AI 产品、0→1 与生成质量方向的下一段实践。",
    contactNote: "完整经历、项目背景与联系方式见简历。",
    resume: "查看完整简历",
    email: "邮件联系",
    footer: "AI PRODUCT / 0→1 / EVALUATION",
  },
  EN: {
    issue: "PERSONAL SITE / EDITED 03",
    nav: [["EXPERIENCE", "#experience"], ["WORK", "#projects"], ["METHOD", "#approach"]],
    eyebrow: "AI PRODUCT / 0→1 / EVALUATION",
    name: "Kesi Zhu",
    personalNote: { title: "A personal note", nowLabel: "Lately: ", now: "Hackathons", interestsLabel: "Interests: ", interests: "J-pop, musicals & travel" },
    statement: "AI product manager with experience across enterprise generation evaluation, zero-to-one ventures, and complex B2B systems. I turn model capabilities into measurable, iterative products that work in practice.",
    facts: [["5", "personal AI projects"], ["3", "EI / IEEE papers"], ["20+", "awards & recognition"], ["5", "product experiences"]],
    scroll: "View experience and work",
    experienceLabel: "EXPERIENCE / IMPACT",
    experienceTitle: "Work Experience",
    experienceNote: "Five roles taught me to see real-world constraints first, then decide where technology creates value.",
    projectsLabel: "SELECTED WORK / PROOF",
    projectsTitle: "Projects with verifiable outcomes",
    projectsNote: "Real products, prototypes, and results make the case—not self-description.",
    proofs: ["Product architecture / business validation", "Decision design / AI workflow", "AI flow / cross-cultural teamwork", "Active learning / AI engineering", "Creative prototyping / independent build"],
    approachLabel: "HOW I WORK / ONE SYSTEM",
    approachTitle: "Turn uncertainty into a testable product path",
    approachNote: "One operating method across discovery, prototyping, evaluation, and delivery.",
    method: [
      ["01", "Define the real problem", "Clarify the user, context, and success criteria"],
      ["02", "Build evidence quickly", "Reduce uncertainty with prototypes, data, and interviews"],
      ["03", "Expose constraints", "Balance quality, cost, and collaboration complexity"],
      ["04", "Close the loop", "Improve against reproducible standards"],
    ],
    toolkit: "Capability toolkit",
    contactLabel: "AVAILABLE FOR PRODUCT WORK",
    contactTitle: "Looking for the next challenge in AI product, zero-to-one, and generation quality.",
    contactNote: "See the full résumé for experience, project context, and contact details.",
    resume: "View full résumé",
    email: "Email me",
    footer: "AI PRODUCT / 0→1 / EVALUATION",
  },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function TopBar({ lang, setLang, s }: { lang: Lang; setLang: (value: Lang) => void; s: any }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#efe9dd]/10 bg-[#090b0d]/88 backdrop-blur-xl">
    <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-[6vw]">
      <a href="#top" onClick={() => setMobileOpen(false)} className="story-label text-[#efe9dd]">KZ / 2026</a>
      <nav aria-label={lang === "CN" ? "页面章节" : "Page sections"} className="hidden gap-8 md:flex">{s.nav.map(([label, href]: string[]) => <a key={href} href={href} className="story-label text-[#71787c] hover:text-[#efe9dd]">{label}</a>)}</nav>
      <div className="flex items-center gap-2">
        <div className="flex gap-1 rounded-full border border-[#efe9dd]/15 p-1">{(["CN", "EN"] as Lang[]).map(item => <button type="button" key={item} onClick={() => setLang(item)} aria-pressed={lang === item} className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-[.16em] ${lang === item ? "bg-[#efe9dd] text-[#090b0d]" : "text-[#71787c]"}`}>{item}</button>)}</div>
        <button type="button" aria-controls="mobile-section-nav" aria-expanded={mobileOpen} aria-label={mobileOpen ? (lang === "CN" ? "关闭章节导航" : "Close section navigation") : (lang === "CN" ? "打开章节导航" : "Open section navigation")} onClick={() => setMobileOpen(value => !value)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[#efe9dd]/15 text-[#efe9dd] md:hidden">
          {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
    </div>
    {mobileOpen && <motion.nav id="mobile-section-nav" aria-label={lang === "CN" ? "页面章节" : "Page sections"} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-[#efe9dd]/10 bg-[#090b0d]/96 px-5 py-3 md:hidden">
      <div className="mx-auto grid max-w-[1600px] grid-cols-3 gap-2">{s.nav.map(([label, href]: string[]) => <a key={href} href={href} onClick={() => setMobileOpen(false)} className="rounded-lg border border-[#efe9dd]/10 px-3 py-3 text-center story-label text-[#b8b5ae] active:bg-[#efe9dd] active:text-[#090b0d]">{label}</a>)}</div>
    </motion.nav>}
  </header>;
}

function Dock({ t }: { t: any }) {
  const items = [{ label: t.dock.phone, icon: Smartphone, href: "tel:13568009560" }, { label: t.dock.email, icon: Mail, href: "mailto:1162135252@qq.com" }, { label: t.dock.linkedin, icon: Linkedin, href: "https://www.linkedin.com/in/kesi-zhu" }, { label: t.dock.resume, icon: FileText, href: "/CV_simplyfy_KesiZhu.pdf" }];
  return <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"><div className="flex gap-1 rounded-full border border-[#efe9dd]/20 bg-[#0a0c0e]/90 p-1.5 shadow-2xl backdrop-blur-xl">{items.map(({ label, icon: Icon, href }) => <a key={label} href={href} target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={label} className="group relative flex h-11 w-11 items-center justify-center rounded-full text-[#92989b] hover:bg-[#efe9dd] hover:text-[#090b0d]"><Icon className="h-[18px] w-[18px]" /><span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded bg-[#efe9dd] px-2 py-1 text-[10px] font-bold text-[#090b0d] opacity-0 group-hover:opacity-100">{label}</span></a>)}</div></div>;
}

function Experience({ exp, index }: { exp: any; index: number }) {
  return <article className="grid gap-5 border-t border-[#141719]/15 py-7 md:grid-cols-[72px_190px_1fr] md:gap-7 md:py-8">
    <span className="story-serif text-4xl italic text-[#a19a8d]">{String(index + 1).padStart(2, "0")}</span>
    <div><p className="font-mono text-[11px] text-[#6c706f]">{exp.period}</p><h3 className="mt-3 text-lg font-black tracking-[-.02em] md:text-xl">{exp.company}</h3><p className="mt-1 text-xs font-semibold text-[#596064]">{exp.role}</p></div>
    <div className="md:pt-1"><p className="max-w-3xl text-sm leading-7 text-[#4d5458] md:text-[15px]">{exp.detail}</p><div className="mt-4 flex flex-wrap gap-1.5">{exp.tags.map((tag: string) => <span key={tag} className="rounded-full border border-[#15191b]/15 px-2.5 py-1 font-mono text-[9px] text-[#555c60]">{tag}</span>)}</div></div>
  </article>;
}

function Project({ project, proof }: { project: any; proof: string }) {
  const mountedPrint = project.imagePresentation === "mounted-print";
  const visual = mountedPrint ? (
    <div className="project-print-board absolute inset-0">
      <div className="project-print-sheet">
        <Image src={project.image} alt={project.name} fill sizes="(min-width: 768px) 35vw, 75vw" className="object-cover object-top" />
        <span aria-hidden="true" className="project-print-clip" />
      </div>
      <span aria-hidden="true" className="project-print-index">FILE / {project.id}</span>
    </div>
  ) : project.image ? <Image src={project.image} alt={project.name} fill sizes="(min-width: 768px) 50vw, 100vw" className={`object-cover opacity-80 transition-all duration-700 group-hover:scale-[1.025] group-hover:opacity-100 ${project.imagePosition === "top" ? "object-top" : ""}`} /> : project.video ? <video src={project.video} autoPlay loop muted playsInline className="h-full w-full object-cover opacity-80 group-hover:opacity-100" /> : null;
  const card = <article className="group grid h-full grid-rows-[auto_1fr] overflow-hidden border border-[#efe9dd]/14 bg-[#0d1012] transition-colors hover:border-[#9ce3be]/50"><div className="relative aspect-[16/9] overflow-hidden border-b border-[#efe9dd]/10 bg-[#121619]">{visual}<div className="absolute inset-x-0 top-0 flex justify-between bg-gradient-to-b from-black/75 to-transparent p-4"><span className="story-label text-white/80" style={{ textTransform: "none" }}>{project.id} / {project.type}</span><span className="rounded-full border border-white/25 bg-black/35 px-2 py-1 font-mono text-[9px] text-white">{project.statLabel}</span></div></div><div className="flex flex-col p-6"><p className="story-label text-[#9ce3be]">PROVES / {proof}</p><h3 className="mt-4 text-2xl font-black tracking-[-.035em]">{project.name}</h3><p className="mt-3 flex-1 text-sm leading-7 text-[#93999c]">{project.desc}</p><div className="mt-6 flex justify-between border-t border-[#efe9dd]/10 pt-4 text-xs font-bold uppercase tracking-[.12em]"><span style={{ textTransform: "none" }}>{project.cta}</span><ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div></article>;
  return project.link ? <Link href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} className="block h-full">{card}</Link> : <div className="h-full">{card}</div>;
}

export default function EditorialHome({ content }: Props) {
  const [lang, setLang] = useState<Lang>("CN");
  const t = content[lang];
  const s = copy[lang];
  return <main className="story-shell min-h-screen overflow-hidden bg-[#090b0d] text-[#efe9dd] selection:bg-[#9ce3be] selection:text-[#090b0d]">
    <FolderIntroPrototype eyebrow={s.eyebrow} lang={lang} location={t.hero.location} issue={s.issue} scroll={s.scroll} statement={s.statement} name={s.name} personalNote={s.personalNote} facts={s.facts} />
    <TopBar lang={lang} setLang={setLang} s={s} />

    <section id="top"><PaperHero eyebrow={s.eyebrow} facts={s.facts} issue={s.issue} location={t.hero.location} scroll={s.scroll} statement={s.statement} name={s.name} personalNote={s.personalNote} /></section>

    <section id="experience" className="bg-[#efe9dd] px-5 py-20 text-[#111416] md:px-10 md:py-28 lg:px-[6vw]"><div className="mx-auto max-w-[1500px]">
      <Reveal className="grid gap-7 border-t border-[#111416]/20 pt-6 md:grid-cols-[1fr_.65fr] md:items-end"><div><span className="story-label text-[#167b57]">{s.experienceLabel}</span><h2 className="story-serif mt-5 max-w-4xl text-5xl tracking-[-.05em] md:text-7xl">{s.experienceTitle}</h2></div><p className="max-w-lg text-sm leading-7 text-[#596064] md:justify-self-end md:text-base">{s.experienceNote}</p></Reveal>
      <div className="mt-14 border-b border-[#141719]/15">{t.experience.map((exp: any, index: number) => <Reveal key={`${exp.company}-${exp.period}`}><Experience exp={exp} index={index} /></Reveal>)}</div>
    </div></section>

    <section id="projects" className="bg-[#0d1012] px-5 py-20 md:px-10 md:py-28 lg:px-[6vw]"><div className="mx-auto max-w-[1500px]">
      <Reveal className="grid gap-7 border-t border-[#efe9dd]/15 pt-6 md:grid-cols-[1fr_.65fr] md:items-end"><div><span className="story-label text-[#9ce3be]">{s.projectsLabel}</span><h2 className="story-serif mt-5 max-w-4xl text-5xl tracking-[-.05em] md:text-7xl">{s.projectsTitle}</h2></div><p className="max-w-lg text-sm leading-7 text-[#92989b] md:justify-self-end md:text-base">{s.projectsNote}</p></Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-6">{t.projects.map((project: any, index: number) => <Reveal key={project.id} className={index < 2 ? "xl:col-span-3" : "xl:col-span-2"}><Project project={project} proof={s.proofs[index]} /></Reveal>)}</div>
    </div></section>

    <section id="approach" className="bg-[#f2a15f] px-5 py-20 text-[#111416] md:px-10 md:py-28 lg:px-[6vw]"><div className="mx-auto max-w-[1500px]">
      <Reveal className="border border-[#111416]/25 bg-[#f5ad71] p-6 shadow-[12px_14px_0_rgba(17,20,22,.12)] md:p-10"><div className="grid gap-8 border-b border-[#111416]/20 pb-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><span className="story-label">{s.approachLabel}</span><h2 className="story-serif mt-5 max-w-4xl text-4xl tracking-[-.045em] md:text-6xl">{s.approachTitle}</h2></div><p className="max-w-lg text-sm leading-7 text-[#4d4540] lg:justify-self-end md:text-base">{s.approachNote}</p></div>
        <div className="mt-8 grid border-y border-[#111416]/18 md:grid-cols-4">{s.method.map(([no, title, note]: string[]) => <div key={no} className="border-b border-[#111416]/15 p-5 md:min-h-44 md:border-b-0 md:border-r md:last:border-r-0"><span className="story-serif text-3xl italic text-[#805226]">{no}</span><h3 className="mt-7 text-base font-black">{title}</h3><p className="mt-2 text-xs leading-6 text-[#5e5148]">{note}</p></div>)}</div>
        <div className="mt-8 grid gap-5 md:grid-cols-[160px_1fr] md:items-start"><span className="story-label pt-2">{s.toolkit}</span><div className="flex flex-wrap gap-2">{t.skills.flatMap((skill: any) => skill.tags.slice(0, 2)).map((tag: string, index: number) => <span key={`${tag}-${index}`} className="rounded-full border border-[#111416]/20 bg-[#f7bb87] px-3 py-2 font-mono text-[10px] font-semibold">{tag}</span>)}</div></div>
      </Reveal>
    </div></section>

    <section className="story-ending relative bg-[#efe9dd] px-5 py-20 text-[#111416] md:px-10 md:py-28 lg:px-[6vw]"><div className="story-noise pointer-events-none absolute inset-0 opacity-20" /><Reveal className="relative mx-auto max-w-[1300px]"><span className="story-label text-[#167b57]">{s.contactLabel}</span><h2 className="story-serif mt-7 max-w-5xl text-[clamp(2.8rem,5.8vw,6.5rem)] leading-[.96] tracking-[-.05em]">{s.contactTitle}</h2><div className="mt-10 flex flex-col gap-6 border-t border-[#111416]/18 pt-7 md:flex-row md:items-end md:justify-between"><p className="max-w-xl text-sm leading-7 text-[#555c60] md:text-base">{s.contactNote}</p><div className="flex flex-wrap gap-5"><a href="mailto:1162135252@qq.com" className="flex items-center gap-2 border-b border-[#111416] pb-2 text-sm font-black uppercase tracking-[.1em] hover:text-[#167b57]">{s.email}<Mail className="h-4 w-4" /></a><a href="/CV_simplyfy_KesiZhu.pdf" target="_blank" className="flex items-center gap-2 border-b border-[#111416] pb-2 text-sm font-black uppercase tracking-[.1em] hover:text-[#167b57]">{s.resume}<ArrowUpRight className="h-4 w-4" /></a></div></div></Reveal></section>

    <footer className="px-5 pb-32 pt-9 md:px-10 lg:px-[6vw]"><div className="mx-auto flex max-w-[1500px] flex-col gap-3 border-t border-[#efe9dd]/12 pt-6 story-label text-[#5d6467] md:flex-row md:justify-between"><span>{t.footer.copyright}</span><span>{s.footer}</span></div></footer>
    <Dock t={t} />
  </main>;
}
