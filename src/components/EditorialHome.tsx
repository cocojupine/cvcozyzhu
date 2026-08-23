"use client";

import { useState } from "react";
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

export default function EditorialHome({ content }: EditorialHomeProps) {
  const [lang, setLang] = useState<Lang>("CN");
  const t = content[lang];
  const e = editorialCopy[lang];
  const reduceMotion = useReducedMotion();

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

      <section id="top" className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] items-center gap-12 px-5 pb-20 pt-28 md:px-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-4">
        <div className="relative z-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-2 w-2 rounded-full bg-[#82d8b0] shadow-[0_0_16px_#82d8b0]" />
            <span className="editorial-label text-[#82d8b0]">{e.eyebrow}</span>
          </motion.div>

          <h1 className="editorial-display max-w-[920px] text-[clamp(3.7rem,8.2vw,8.7rem)] leading-[.84] tracking-[-.055em]">
            {e.thesis.map((line, index) => (
              <motion.span
                key={line}
                initial={reduceMotion ? false : { opacity: 0, y: 42 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.08 + index * 0.11, ease: [0.22, 1, 0.36, 1] }}
                className={`block ${index === 1 ? "italic text-[#82d8b0]" : "text-[#f2efe7]"}`}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.48 }}
            className="mt-9 max-w-2xl border-l border-[#f3a85f] pl-5 text-lg leading-8 text-[#c4c5c2] md:text-xl md:leading-9"
          >
            {e.statement}
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            <span className="editorial-label text-[#707679]">{t.hero.location}</span>
            <span className="h-px w-8 bg-[#f2efe7]/18" />
            <span className="editorial-label text-[#f2efe7]">{t.hero.role}</span>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <ManifestoDiagram lang={lang} />
          <div className="mx-auto mt-3 grid max-w-[520px] grid-cols-3 border-y border-[#f2efe7]/12 py-4">
            {e.facts.map(([number, label]) => (
              <div key={label} className="border-r border-[#f2efe7]/10 px-3 last:border-r-0">
                <div className="editorial-display text-2xl text-[#f2efe7] md:text-3xl">{number}</div>
                <div className="mt-1 text-[10px] uppercase leading-4 tracking-[.14em] text-[#707679]">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <a href="#method" className="absolute bottom-7 left-5 flex items-center gap-3 text-[#707679] hover:text-[#f2efe7] md:left-10">
          <ArrowDown className="h-4 w-4" />
          <span className="editorial-label">{e.scroll}</span>
        </a>
      </section>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-10">
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
    </main>
  );
}
