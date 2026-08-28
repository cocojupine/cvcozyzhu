"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  FileText,
  Linkedin,
  Mail,
  Smartphone,
} from "lucide-react";

type Lang = "EN" | "CN";
type HeroVariant = "desk" | "signal" | "manifesto";

type EditorialHomeProps = {
  content: Record<Lang, any>;
};

const editorialCopy = {
  CN: {
    issue: "个人网站 · 第一期",
    eyebrow: "HACKATHON SPIRIT · PRODUCT MINDSET",
    thesis: ["一个带着", "黑客松精神", "做产品的人。"],
    statement:
      "兴趣把我带向新的问题，行动让我把想法做出来，而商业化思维让我判断，什么值得成为真正的产品。",
    proof: "经过验证的事实",
    facts: [
      ["02", "AI 创业实践"],
      ["03", "EI / IEEE 论文"],
      ["20+", "奖项与认可"],
    ],
    scroll: "向下阅读",
    methodNote: "能力不是标签的集合，而是我面对新问题时可以调动的方法。",
    experienceNote: "在不同系统中学习、判断并交付；业务不同，但行动方式始终连贯。",
    projectsNote: "项目是能力留下的证据。具体业务可以改变，创造与落地的方法会持续生长。",
    current: "现在",
    notesTitle: "开放笔记",
    notesIntro: "这些位置故意留白。它们不是虚构内容，而是下一次由你补上的个人线索。",
    notePrompts: [
      ["正在学习", "最近哪个新知识改变了你看问题的方式？"],
      ["正在尝试", "最近有什么小想法，让你忍不住亲手做出来？"],
      ["跨越边界", "哪次跨文化交流，让你重新理解了产品或合作？"],
    ],
    diagram: {
      curiosity: "兴趣 / CURIOSITY",
      action: "行动 / ACTION",
      value: "价值 / VALUE",
      center: "产品",
    },
  },
  EN: {
    issue: "PERSONAL SITE · ISSUE 01",
    eyebrow: "HACKATHON SPIRIT · PRODUCT MINDSET",
    thesis: ["A product person", "with a hackathon", "state of mind."],
    statement:
      "Curiosity leads me to new questions. Action turns ideas into things, and commercial judgment tells me what deserves to become a real product.",
    proof: "PROOF, NOT PROMISES",
    facts: [
      ["02", "AI start-up journeys"],
      ["03", "EI / IEEE papers"],
      ["20+", "awards & recognition"],
    ],
    scroll: "Read the story",
    methodNote: "Capabilities are not a pile of labels. They are the methods I can call on when a new problem appears.",
    experienceNote: "Different systems, one continuous practice: learn quickly, make judgments, and deliver.",
    projectsNote: "Projects are evidence. The business changes; the instinct to make and carry ideas into reality remains.",
    current: "NOW",
    notesTitle: "OPEN NOTES",
    notesIntro: "These spaces are intentionally unfinished — prompts for the personal details only you can add next.",
    notePrompts: [
      ["LEARNING", "What new idea recently changed the way you see a problem?"],
      ["MAKING", "What small idea made you want to build immediately?"],
      ["CROSSING", "Which cross-cultural moment changed how you understand products or teams?"],
    ],
    diagram: {
      curiosity: "CURIOSITY",
      action: "ACTION",
      value: "VALUE",
      center: "PRODUCT",
    },
  },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ManifestoDiagram({ lang }: { lang: Lang }) {
  const d = editorialCopy[lang].diagram;
  return (
    <div className="relative aspect-square w-full max-w-[520px] mx-auto" aria-label={`${d.curiosity}, ${d.action}, ${d.value}`}>
      <div className="absolute inset-[9%] rounded-full border border-[#f2efe7]/15" />
      <div className="absolute inset-[18%] rounded-full border border-dashed border-[#82d8b0]/30 editorial-orbit" />
      <svg viewBox="0 0 100 100" className="absolute inset-[15%] h-[70%] w-[70%] overflow-visible" aria-hidden="true">
        <path d="M50 8 L12 78 L88 78 Z" fill="none" stroke="rgba(242,239,231,.28)" strokeWidth=".45" />
        <circle cx="50" cy="8" r="1.8" fill="#82d8b0" />
        <circle cx="12" cy="78" r="1.8" fill="#6fa8ff" />
        <circle cx="88" cy="78" r="1.8" fill="#f3a85f" />
      </svg>

      <div className="absolute left-1/2 top-[3%] -translate-x-1/2 text-center">
        <span className="editorial-label text-[#82d8b0]">{d.curiosity}</span>
      </div>
      <div className="absolute bottom-[8%] left-[2%]">
        <span className="editorial-label text-[#6fa8ff]">{d.action}</span>
      </div>
      <div className="absolute bottom-[8%] right-[2%] text-right">
        <span className="editorial-label text-[#f3a85f]">{d.value}</span>
      </div>

      <div className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#f2efe7]/20 bg-[#0c0f12]/90 shadow-[0_0_80px_rgba(130,216,176,.08)]">
        <span className="editorial-display text-2xl italic text-[#f2efe7]">{d.center}</span>
      </div>

      <span className="absolute left-[47%] top-[16%] h-2.5 w-2.5 rounded-full bg-[#82d8b0] shadow-[0_0_18px_#82d8b0] editorial-orbit-dot" />
    </div>
  );
}

function SectionTitle({ number, title, note }: { number: string; title: string; note: string }) {
  return (
    <div className="mb-12 grid gap-6 border-t border-[#f2efe7]/16 pt-5 md:grid-cols-[140px_1fr_1fr] md:items-start">
      <span className="editorial-label text-[#82d8b0]">{number}</span>
      <h2 className="editorial-display text-4xl leading-none text-[#f2efe7] md:text-6xl">{title}</h2>
      <p className="max-w-md text-sm leading-7 text-[#a9adaf] md:justify-self-end md:text-base">{note}</p>
    </div>
  );
}

function ContactDock({ t }: { t: any }) {
  const items = [
    { label: t.dock.phone, icon: Smartphone, href: "tel:13568009560" },
    { label: t.dock.email, icon: Mail, href: "mailto:1162135252@qq.com" },
    { label: t.dock.linkedin, icon: Linkedin, href: "https://www.linkedin.com/in/kesi-zhu" },
    { label: t.dock.resume, icon: FileText, href: "/CV_simplyfy_KesiZhu.pdf" },
  ];

  return (
    <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-[#f2efe7]/16 bg-[#090b0d]/90 p-1.5 shadow-2xl shadow-black/60 backdrop-blur-xl">
        {items.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative flex h-11 w-11 items-center justify-center rounded-full text-[#8f9598] transition-colors hover:bg-[#f2efe7] hover:text-[#090b0d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#82d8b0]"
          >
            <Icon className="h-[18px] w-[18px]" />
            <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#f2efe7] px-2 py-1 text-[10px] font-semibold uppercase tracking-[.15em] text-[#090b0d] opacity-0 transition-opacity group-hover:opacity-100">
              {label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

function FactStrip({ facts }: { facts: string[][] }) {
  return (
    <div className="grid grid-cols-3 border-y border-[#f2efe7]/12 py-4">
      {facts.map(([number, label]) => (
        <div key={label} className="border-r border-[#f2efe7]/10 px-3 last:border-r-0">
          <div className="editorial-display text-2xl text-[#f2efe7] md:text-3xl">{number}</div>
          <div className="mt-1 text-[9px] uppercase leading-4 tracking-[.14em] text-[#707679] md:text-[10px]">{label}</div>
        </div>
      ))}
    </div>
  );
}

function HeroDesk({ t, e, reduceMotion }: { t: any; e: any; reduceMotion: boolean | null }) {
  return (
    <section id="top" className="editorial-workbench relative z-10 min-h-screen overflow-hidden px-5 pb-24 pt-28 md:px-10 lg:px-[7vw]">
      <div className="pointer-events-none absolute -right-[4vw] top-[6vh] select-none font-black leading-none tracking-[-.08em] text-[#f2efe7]/[.025] text-[clamp(12rem,35vw,38rem)]">48H</div>
      <div className="relative mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1540px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
        <div className="relative z-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -18 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="mb-7 inline-flex -rotate-1 items-center gap-3 border border-[#82d8b0]/40 bg-[#0b1712] px-4 py-2 shadow-[6px_6px_0_rgba(130,216,176,.12)]"
          >
            <span className="h-2 w-2 rounded-full bg-[#82d8b0] shadow-[0_0_14px_#82d8b0]" />
            <span className="editorial-label text-[#82d8b0]">{e.eyebrow}</span>
          </motion.div>

          <h1 className="max-w-[820px] text-[clamp(4.4rem,9.4vw,10.5rem)] font-black leading-[.77] tracking-[-.075em] text-[#f2efe7]">
            <motion.span initial={reduceMotion ? false : { y: 50, opacity: 0 }} animate={reduceMotion ? undefined : { y: 0, opacity: 1 }} transition={{ duration: 0.75 }} className="block">{e.thesis[0]}</motion.span>
            <motion.span initial={reduceMotion ? false : { y: 50, opacity: 0 }} animate={reduceMotion ? undefined : { y: 0, opacity: 1 }} transition={{ duration: 0.75, delay: .08 }} className="editorial-display block font-normal italic text-[#82d8b0]">{e.thesis[1]}</motion.span>
            <motion.span initial={reduceMotion ? false : { y: 50, opacity: 0 }} animate={reduceMotion ? undefined : { y: 0, opacity: 1 }} transition={{ duration: 0.75, delay: .16 }} className="block">{e.thesis[2]}</motion.span>
          </h1>

          <div className="mt-10 max-w-2xl bg-[#f2efe7] p-5 text-[#090b0d] shadow-[10px_10px_0_#f3a85f] md:-rotate-1 md:p-7">
            <span className="editorial-label text-[#52605a]">PERSONAL STATEMENT / 01</span>
            <p className="mt-4 text-lg font-semibold leading-8 md:text-xl md:leading-9">{e.statement}</p>
          </div>
        </div>

        <div className="relative z-10 grid gap-4 md:block md:min-h-[650px] lg:min-h-[720px]">
          <div className="absolute inset-0 hidden border border-[#f2efe7]/12 bg-[#0b0e11]/70 shadow-[0_40px_100px_rgba(0,0,0,.35)] md:block">
            <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-[#f2efe7]/10 px-4">
              <span className="editorial-label text-[#707679]">KZ_BUILD_DESK / LIVE BOARD</span>
              <span className="editorial-label text-[#f3a85f]">TIMEBOX: OPEN</span>
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, rotate: -8, scale: .9 }}
            animate={reduceMotion ? undefined : { opacity: 1, rotate: -4, scale: 1 }}
            transition={{ duration: .8, delay: .2 }}
            className="relative w-full -rotate-2 bg-[#d8ff54] p-5 text-[#11140b] shadow-[8px_10px_0_rgba(0,0,0,.35)] md:absolute md:left-[5%] md:top-[12%] md:w-[44%] md:-rotate-4 md:p-7 md:shadow-[12px_16px_0_rgba(0,0,0,.35)]"
          >
            <span className="editorial-label text-[#3f4c0a]">01 / INTEREST</span>
            <p className="editorial-display mt-4 text-2xl leading-tight md:text-4xl">{t.hero.tags.join(" · ")}</p>
            <div className="mt-7 h-px bg-[#11140b]/25" />
            <span className="mt-3 block text-xs font-semibold">FOLLOW WHAT MAKES YOU CURIOUS →</span>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, rotate: 7, scale: .9 }}
            animate={reduceMotion ? undefined : { opacity: 1, rotate: 3, scale: 1 }}
            transition={{ duration: .8, delay: .34 }}
            className="relative w-full rotate-1 bg-[#6fa8ff] p-5 text-[#07101e] shadow-[8px_10px_0_rgba(0,0,0,.35)] md:absolute md:right-[3%] md:top-[24%] md:w-[46%] md:rotate-3 md:p-7 md:shadow-[12px_16px_0_rgba(0,0,0,.35)]"
          >
            <span className="editorial-label text-[#17345f]">02 / ACTION</span>
            <p className="mt-4 text-xl font-black leading-tight md:text-3xl">BUILD BEFORE THE IDEA GETS COMFORTABLE.</p>
            <div className="mt-7 flex items-center justify-between border-t border-[#07101e]/20 pt-3">
              <span className="editorial-label text-[#17345f]">PROTOTYPE</span>
              <span className="text-3xl">↗</span>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: .8, delay: .48 }}
            className="relative w-full -rotate-1 bg-[#f4a261] p-5 text-[#1a0e06] shadow-[8px_10px_0_rgba(0,0,0,.35)] md:absolute md:bottom-[8%] md:left-[14%] md:right-[8%] md:w-auto md:rotate-0 md:p-7 md:shadow-[12px_16px_0_rgba(0,0,0,.35)]"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <span className="editorial-label text-[#6c3514]">03 / COMMERCIAL JUDGMENT</span>
                <p className="editorial-display mt-3 text-2xl italic leading-tight md:text-4xl">What deserves to become a real product?</p>
              </div>
              <div className="rounded-full border-2 border-[#1a0e06] px-3 py-6 text-center text-xs font-black uppercase tracking-widest">VALUE<br />CHECK</div>
            </div>
          </motion.div>

          <div className="absolute bottom-[3%] right-[3%] hidden rotate-6 border-2 border-[#f2efe7]/45 px-4 py-2 text-center text-[#f2efe7]/65 md:block">
            <span className="editorial-label">{t.hero.location}</span>
          </div>
        </div>
      </div>

      <a href="#open-notes" className="absolute bottom-7 left-5 flex items-center gap-3 text-[#8f9598] hover:text-[#f2efe7] md:left-10 lg:left-[7vw]">
        <ArrowDown className="h-4 w-4" />
        <span className="editorial-label">{e.scroll}</span>
      </a>
    </section>
  );
}

function HeroSignal({ t, e, lang, reduceMotion }: { t: any; e: any; lang: Lang; reduceMotion: boolean | null }) {
  return (
    <section id="top" className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-4">
      <div className="relative z-10">
        <span className="editorial-label text-[#82d8b0]">{e.eyebrow}</span>
        <h1 className="editorial-display mt-8 max-w-[920px] text-[clamp(3.7rem,8.2vw,8.7rem)] leading-[.84] tracking-[-.055em]">
          {e.thesis.map((line: string, index: number) => (
            <motion.span key={line} initial={reduceMotion ? false : { opacity: 0, y: 42 }} animate={reduceMotion ? undefined : { opacity: 1, y: 0 }} transition={{ duration: .8, delay: index * .1 }} className={`block ${index === 1 ? "italic text-[#82d8b0]" : "text-[#f2efe7]"}`}>{line}</motion.span>
          ))}
        </h1>
        <p className="mt-9 max-w-2xl border-l border-[#f3a85f] pl-5 text-lg leading-8 text-[#c4c5c2] md:text-xl md:leading-9">{e.statement}</p>
        <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3"><span className="editorial-label text-[#707679]">{t.hero.location}</span><span className="editorial-label text-[#f2efe7]">{t.hero.role}</span></div>
      </div>
      <div><ManifestoDiagram lang={lang} /><FactStrip facts={e.facts} /></div>
    </section>
  );
}

function HeroManifesto({ t, e, reduceMotion }: { t: any; e: any; reduceMotion: boolean | null }) {
  return (
    <section id="top" className="relative z-10 flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-12 pt-28 md:px-10 lg:px-[7vw]">
      <div className="absolute inset-x-0 top-[18%] whitespace-nowrap text-[clamp(8rem,24vw,28rem)] font-black leading-none tracking-[-.09em] text-[#f2efe7]/[.035]">MAKE / LEARN / VALUE</div>
      <div className="relative z-10 flex items-center justify-between"><span className="editorial-label text-[#82d8b0]">{e.eyebrow}</span><span className="editorial-label text-[#707679]">{t.hero.location}</span></div>
      <div className="relative z-10 mx-auto my-20 max-w-6xl text-center">
        <motion.p initial={reduceMotion ? false : { opacity: 0, scale: .9 }} animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }} className="editorial-display text-[clamp(3rem,7.8vw,8.5rem)] italic leading-[.94] tracking-[-.04em] text-[#f2efe7]">“{e.statement}”</motion.p>
        <div className="mx-auto mt-12 inline-flex -rotate-2 items-center gap-4 bg-[#82d8b0] px-6 py-3 text-[#09110d] shadow-[8px_8px_0_#6fa8ff]">
          <span className="text-sm font-black uppercase tracking-[.14em]">{e.thesis.join(" ")}</span>
        </div>
      </div>
      <FactStrip facts={e.facts} />
    </section>
  );
}

function VariantSwitcher({ variant, onChange }: { variant: HeroVariant; onChange: (variant: HeroVariant) => void }) {
  const options: Array<[HeroVariant, string]> = [["desk", "DESK"], ["signal", "SIGNAL"], ["manifesto", "TYPE"]];
  return (
    <div className="fixed bottom-20 right-4 z-[60] rounded-sm border border-[#f2efe7]/18 bg-[#090b0d]/92 p-1 shadow-2xl backdrop-blur-xl md:bottom-5 md:right-5">
      <div className="mb-1 px-2 py-1 text-[8px] font-bold uppercase tracking-[.18em] text-[#707679]">Prototype view</div>
      <div className="flex gap-1">
        {options.map(([value, label]) => (
          <button key={value} type="button" onClick={() => onChange(value)} className={`px-3 py-2 text-[9px] font-black tracking-[.16em] transition-colors ${variant === value ? "bg-[#d8ff54] text-[#090b0d]" : "text-[#8f9598] hover:bg-white/5 hover:text-white"}`}>{label}</button>
        ))}
      </div>
    </div>
  );
}

function OpenNotes({ e }: { e: any }) {
  const colors = ["#d8ff54", "#6fa8ff", "#f4a261"];
  return (
    <section id="open-notes" className="scroll-mt-24 py-28 md:py-36">
      <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr]">
        <div>
          <span className="editorial-label text-[#82d8b0]">00 / CONTENT SLOTS</span>
          <h2 className="editorial-display mt-5 text-5xl italic leading-none md:text-7xl">{e.notesTitle}</h2>
          <p className="mt-7 max-w-md text-base leading-8 text-[#a9adaf]">{e.notesIntro}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {e.notePrompts.map(([title, prompt]: string[], index: number) => (
            <article key={title} className="group relative min-h-72 overflow-hidden border border-[#f2efe7]/14 bg-[#0c0f12] p-6 transition-transform hover:-translate-y-2">
              <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: colors[index] }} />
              <span className="editorial-label" style={{ color: colors[index] }}>{title}</span>
              <p className="editorial-display mt-10 text-2xl italic leading-snug text-[#f2efe7]">{prompt}</p>
              <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between border-t border-dashed border-[#f2efe7]/18 pt-4">
                <span className="editorial-label text-[#707679]">[ 待补内容 ]</span>
                <span className="text-xl text-[#707679]">＋</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function EditorialHome({ content }: EditorialHomeProps) {
  const [lang, setLang] = useState<Lang>("CN");
  const [variant, setVariant] = useState<HeroVariant>("desk");
  const t = content[lang];
  const e = editorialCopy[lang];
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("view");
    if (value === "desk" || value === "signal" || value === "manifesto") setVariant(value);
  }, []);

  const changeVariant = (next: HeroVariant) => {
    setVariant(next);
    const url = new URL(window.location.href);
    url.searchParams.set("view", next);
    window.history.replaceState({}, "", url);
  };

  return (
    <main className="editorial-shell min-h-screen overflow-x-hidden bg-[#090b0d] pb-36 text-[#f2efe7] selection:bg-[#82d8b0] selection:text-[#090b0d]">
      <div className="editorial-noise fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed inset-y-0 left-[7vw] z-0 hidden w-px bg-[#f2efe7]/8 xl:block" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#f2efe7]/10 bg-[#090b0d]/78 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a href="#top" className="flex items-baseline gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#82d8b0]">
            <span className="editorial-display text-xl italic">Kesi Zhu</span>
            <span className="editorial-label hidden text-[#707679] sm:inline">{e.issue}</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            <a href="#open-notes" className="editorial-label text-[#8f9598] hover:text-[#f2efe7]">{e.notesTitle}</a>
            <a href="#method" className="editorial-label text-[#8f9598] hover:text-[#f2efe7]">{t.sections.skills}</a>
            <a href="#experience" className="editorial-label text-[#8f9598] hover:text-[#f2efe7]">{t.sections.experience}</a>
            <a href="#work" className="editorial-label text-[#8f9598] hover:text-[#f2efe7]">{t.sections.projects}</a>
          </nav>

          <div className="flex items-center rounded-full border border-[#f2efe7]/12 p-1">
            {(["CN", "EN"] as Lang[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLang(item)}
                aria-pressed={lang === item}
                className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-[.18em] transition-colors focus-visible:outline-2 focus-visible:outline-[#82d8b0] ${lang === item ? "bg-[#f2efe7] text-[#090b0d]" : "text-[#707679] hover:text-[#f2efe7]"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </header>

      {variant === "desk" && <HeroDesk t={t} e={e} reduceMotion={reduceMotion} />}
      {variant === "signal" && <HeroSignal t={t} e={e} lang={lang} reduceMotion={reduceMotion} />}
      {variant === "manifesto" && <HeroManifesto t={t} e={e} reduceMotion={reduceMotion} />}

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
        <OpenNotes e={e} />
        <section id="method" className="scroll-mt-24 py-28 md:py-36">
          <SectionTitle number="01 / METHOD" title={t.sections.skills} note={e.methodNote} />
          <div className="border-b border-[#f2efe7]/14">
            {t.skills.map((skill: any, index: number) => (
              <Reveal key={skill.title}>
                <article className="group grid gap-5 border-t border-[#f2efe7]/14 py-8 md:grid-cols-[90px_1.05fr_1.25fr] md:gap-8 md:py-11">
                  <span className="editorial-display text-4xl italic text-[#3f4548] transition-colors group-hover:text-[#82d8b0]">0{index + 1}</span>
                  <div>
                    <h3 className="editorial-display text-3xl leading-tight text-[#f2efe7] md:text-4xl">{skill.title}</h3>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {skill.tags.map((tag: string) => (
                        <span key={tag} className="rounded-full border border-[#f2efe7]/14 px-3 py-1 text-[10px] font-semibold tracking-[.08em] text-[#8f9598]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="max-w-2xl text-base leading-8 text-[#a9adaf] md:text-lg md:leading-9">{skill.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-24 py-28 md:py-36">
          <SectionTitle number="02 / JOURNEY" title={t.sections.experience} note={e.experienceNote} />
          <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-28 border-l border-[#82d8b0]/35 pl-5">
                <span className="editorial-label text-[#82d8b0]">{e.current}</span>
                <div className="editorial-display mt-3 text-3xl italic">{t.hero.role}</div>
                <p className="mt-4 text-sm leading-6 text-[#707679]">{t.hero.location}</p>
              </div>
            </aside>

            <div>
              {t.experience.map((exp: any, index: number) => (
                <Reveal key={`${exp.company}-${exp.period}`}>
                  <article className="group relative border-t border-[#f2efe7]/14 py-9 md:py-12">
                    <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <span className="editorial-label text-[#82d8b0]">{exp.period}</span>
                        <h3 className="editorial-display mt-3 text-3xl leading-tight text-[#f2efe7] md:text-5xl">{exp.company}</h3>
                      </div>
                      <span className="max-w-xs text-left text-xs font-semibold uppercase leading-5 tracking-[.14em] text-[#8f9598] md:text-right">{exp.role}</span>
                    </div>
                    <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
                      <div className="flex flex-wrap content-start gap-2">
                        {exp.tags.map((tag: string) => (
                          <span key={tag} className="editorial-label rounded-sm bg-[#f2efe7]/6 px-2 py-1 text-[#8f9598]">{tag}</span>
                        ))}
                      </div>
                      <p className="text-base leading-8 text-[#a9adaf] md:text-lg md:leading-9">{exp.detail}</p>
                    </div>
                    <span className="absolute right-0 top-1/2 hidden -translate-y-1/2 text-[7rem] font-black tracking-tighter text-[#f2efe7]/[.018] md:block">0{index + 1}</span>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-24 py-28 md:py-36">
          <SectionTitle number="03 / EVIDENCE" title={t.sections.projects} note={e.projectsNote} />
          <div className="grid gap-px overflow-hidden border border-[#f2efe7]/14 bg-[#f2efe7]/14 md:grid-cols-2">
            {t.projects.map((project: any, index: number) => {
              const card = (
                <article className="group flex h-full flex-col bg-[#090b0d] p-5 transition-colors hover:bg-[#0e1215] md:p-7">
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#0d1012]">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover grayscale-[25%] transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0"
                      />
                    ) : project.video ? (
                      <video src={project.video} autoPlay loop muted playsInline className="h-full w-full object-cover" />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b0d]/65 via-transparent to-transparent" />
                    <span className="editorial-display absolute bottom-3 left-4 text-5xl italic text-[#f2efe7]/90">{project.id}</span>
                  </div>
                  <div className="flex flex-1 flex-col pt-6">
                    <div className="mb-4 flex items-start justify-between gap-5">
                      <div>
                        <span className="editorial-label text-[#82d8b0]">{project.type}</span>
                        <h3 className="editorial-display mt-2 text-3xl text-[#f2efe7] md:text-4xl">{project.name}</h3>
                      </div>
                      <div className="text-right">
                        <div className="editorial-display text-xl italic text-[#f3a85f]">{project.stat}</div>
                        <div className="editorial-label mt-1 text-[#707679]">{project.statLabel}</div>
                      </div>
                    </div>
                    <p className="mb-7 max-w-xl text-sm leading-7 text-[#a9adaf] md:text-base">{project.desc}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-[#f2efe7]/10 pt-4">
                      <span className="editorial-label text-[#8f9598]">{project.cta}</span>
                      {project.link && <ArrowUpRight className="h-4 w-4 text-[#82d8b0] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />}
                    </div>
                  </div>
                </article>
              );

              return project.link ? (
                <Link
                  key={project.id}
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#82d8b0]"
                >
                  {card}
                </Link>
              ) : (
                <div key={project.id}>{card}</div>
              );
            })}
          </div>
        </section>

        <footer className="mt-20 grid gap-7 border-t border-[#f2efe7]/14 pb-8 pt-8 text-[#707679] md:grid-cols-3 md:items-end">
          <div>
            <div className="editorial-display text-3xl italic text-[#f2efe7]">{t.footer.end}</div>
            <p className="editorial-label mt-3">{t.footer.status}</p>
          </div>
          <div className="editorial-label md:text-center">{t.hero.location}</div>
          <div className="editorial-label md:text-right">{t.footer.copyright}</div>
        </footer>
      </div>

      <ContactDock t={t} />
      <VariantSwitcher variant={variant} onChange={changeVariant} />
    </main>
  );
}
