"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, Linkedin, Mail, Smartphone } from "lucide-react";
import FolderIntroPrototype from "@/components/FolderIntroPrototype";
import PaperHero from "@/components/PaperHero";

type Lang = "EN" | "CN";
type Props = { content: Record<Lang, any> };

const copy = {
  CN: {
    issue: "个人网站 / 叙事原型 02",
    nav: [["命题", "#thesis"], ["形成", "#formation"], ["证据", "#evidence"]],
    eyebrow: "HACKATHON SPIRIT / PRODUCT JUDGMENT",
    thesis: ["一个带着", "黑客松精神", "做产品的人。"],
    statement: "兴趣把我带向新的问题，行动让我把想法做出来，而商业化思维让我判断，什么值得成为真正的产品。",
    signature: ["PERSONAL SIGNATURE / KZ", "好奇 · 行动 · 判断", "把陌生问题做成可以验证、协作与交付的产品路径。"],
    facts: [["02", "AI 创业实践"], ["03", "EI / IEEE 论文"], ["20+", "奖项与认可"], ["01", "持续形成中的判断"]],
    scroll: "故事从这里开始",
    qLabel: "THE QUESTION THAT STAYED",
    question: ["一个有趣的想法，", "什么时候才真正", "值得成为产品？"],
    qNote: "我没有一开始就知道答案。答案是在一次次进入陌生领域、把东西做出来，再接受真实世界检验的过程中形成的。",
    principles: [
      ["01 / INTEREST", "兴趣", "让我愿意进入没有标准答案的新问题。"],
      ["02 / ACTION", "行动", "让我不只讨论可能性，而是快速做出可验证的东西。"],
      ["03 / JUDGMENT", "判断", "让我继续追问：它是否值得被使用、被信任、被长期做下去。"],
    ],
    formation: "判断如何形成",
    formationNote: "不是一条履历时间线，而是三次对“做产品”的重新理解。",
    acts: [
      { no: "ACT I", year: "2023—2024", title: "先进入真实系统", lead: "好想法第一次遇到的，不是掌声，而是复杂度。", body: "在医疗与智能硬件的真实业务里，我开始理解：产品不是一张漂亮原型，而是需求、数据、流程与组织共同运转的系统。", bridge: "我学会了把模糊问题变成可定义、可测量、可迭代的对象。", entries: [3, 4], tone: "blue" },
      { no: "ACT II", year: "2025—2026", title: "再把想法押进现实", lead: "当没有现成答案时，就亲手把答案做出来。", body: "联合创办两家 AI 产品，让我从功能、体验和工程一路走到用户、成本与商业模式。黑客松式行动力在这里不再只通往 Demo，而是开始承担结果。", bridge: "我开始知道，做出来只是起点；让它进入真实交易与协作，才会暴露真正的问题。", entries: [2, 1], tone: "orange" },
      { no: "ACT III", year: "2026—NOW", title: "最后，学会让 AI 值得信任", lead: "越接近真实交付，越需要克制、标准与判断。", body: "在企业级 AI 生成产品中，我把注意力从“能力是否惊艳”推进到“质量是否稳定、结果是否适配、系统是否能够持续改进”。", bridge: "今天的我仍然愿意从未知开始，但会用更严格的标准决定什么值得走到最后。", entries: [0], tone: "mint" },
    ],
    judgment: ["WORKING PRINCIPLE / 01", "从“能做”到“值得交付”", "在 AI 生成评估、从 0 到 1 的产品尝试和复杂业务系统迭代中，我更在意把抽象的可能性落实为可复现的问题、可验证的路径，以及能被真实协作承接的结果。", ["先定义真实问题", "用小步验证替代主观判断", "让质量、成本与协作约束显性化", "以可复现的标准持续迭代"], "这套标准仍在不断校正，而不是把每一个新能力都当成最终答案。"],
    evidence: "证据，而不是自我评价",
    evidenceNote: "经历说明判断如何形成；这些能力与作品，让招聘者可以快速核验它。",
    skills: "我如何做产品",
    projects: "项目作为能力索引",
    proofs: ["产品架构 / 商业验证", "AI Flow / 跨文化协作", "主动学习 / AI Engineering", "创意原型 / 独立实现"],
    endingLabel: "STILL CURIOUS. MORE DELIBERATE.",
    ending: "我仍然喜欢从一个新问题开始。不同的是，现在我不只问“能不能做出来”，也会追问“为什么值得做”。",
    endingNote: "这不是一个已经完成的答案，而是我想继续带进下一段工作里的产品判断。",
    resume: "查看完整简历",
  },
  EN: {
    issue: "PERSONAL SITE / NARRATIVE PROTOTYPE 02",
    nav: [["THESIS", "#thesis"], ["FORMATION", "#formation"], ["EVIDENCE", "#evidence"]],
    eyebrow: "HACKATHON SPIRIT / PRODUCT JUDGMENT",
    thesis: ["A product person", "with a hackathon", "state of mind."],
    statement: "Curiosity leads me to new questions. Action turns ideas into things, and commercial judgment tells me what deserves to become a real product.",
    signature: ["PERSONAL SIGNATURE / KZ", "Curiosity · Action · Judgment", "Turning unfamiliar questions into product paths that can be tested, aligned, and delivered."],
    facts: [["02", "AI start-up journeys"], ["03", "EI / IEEE papers"], ["20+", "awards & recognition"], ["01", "evolving point of view"]],
    scroll: "The story starts here",
    qLabel: "THE QUESTION THAT STAYED",
    question: ["When does an", "interesting idea truly", "deserve to be a product?"],
    qNote: "I did not begin with an answer. It emerged by entering unfamiliar fields, making things real, and letting reality test them.",
    principles: [
      ["01 / INTEREST", "Curiosity", "draws me toward questions without standard answers."],
      ["02 / ACTION", "Action", "turns possibility into something that can be tested."],
      ["03 / JUDGMENT", "Judgment", "asks whether it deserves to be used, trusted, and sustained."],
    ],
    formation: "How judgment took shape",
    formationNote: "Not a résumé timeline, but three changes in how I understand product work.",
    acts: [
      { no: "ACT I", year: "2023—2024", title: "Enter real systems", lead: "The first thing a good idea meets is not applause. It is complexity.", body: "Healthcare and intelligent hardware taught me that a product is more than a polished prototype: it is a system of requirements, data, workflows, and organizations.", bridge: "I learned to turn ambiguity into something definable, measurable, and iterative.", entries: [3, 4], tone: "blue" },
      { no: "ACT II", year: "2025—2026", title: "Put ideas into reality", lead: "When no answer exists, make one and let the world respond.", body: "Co-founding two AI products took me from features, experience, and engineering to users, cost, and business models. Hackathon energy became accountable for outcomes, not only demos.", bridge: "Building was only the beginning. Real transactions and collaboration revealed the real problems.", entries: [2, 1], tone: "orange" },
      { no: "ACT III", year: "2026—NOW", title: "Make AI worthy of trust", lead: "The closer a product gets to delivery, the more it needs restraint, standards, and judgment.", body: "In enterprise AI generation, my focus moved from whether a capability impresses to whether quality is stable, outcomes fit the context, and the system can improve continuously.", bridge: "I still begin with uncertainty, but now use a much stricter standard for what deserves to reach the end.", entries: [0], tone: "mint" },
    ],
    judgment: ["WORKING PRINCIPLE / 01", "From what can be built to what deserves to ship", "Across AI-generation evaluation, zero-to-one product work, and complex business systems, I focus on turning abstract possibilities into reproducible problems, testable paths, and outcomes that real teams can carry forward.", ["Define the real problem", "Test in small steps, not by intuition", "Make quality, cost, and collaboration visible", "Iterate against reproducible standards"], "A working standard that I keep revising, rather than treating every new capability as a final answer."],
    evidence: "Evidence, not adjectives",
    evidenceNote: "Experience explains how judgment formed. Capabilities and work let a recruiter verify it quickly.",
    skills: "How I make products",
    projects: "Projects as an evidence index",
    proofs: ["Product architecture / business validation", "AI Flow / cross-cultural teamwork", "Active learning / AI engineering", "Creative prototyping / independent build"],
    endingLabel: "STILL CURIOUS. MORE DELIBERATE.",
    ending: "I still love starting with a new question. The difference is that I now ask not only ‘Can it be built?’ but also ‘Why is it worth building?’",
    endingNote: "Not a finished answer — a way of thinking I want to carry into whatever comes next.",
    resume: "View full résumé",
  },
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={reduced ? false : { opacity: 0, y: 28 }} whileInView={reduced ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .14 }} transition={{ duration: .72, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>{children}</motion.div>;
}

function TopBar({ lang, setLang, s }: { lang: Lang; setLang: (value: Lang) => void; s: any }) {
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#efe9dd]/10 bg-[#090b0d]/80 backdrop-blur-xl"><div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:px-10 lg:px-[6vw]">
    <a href="#top" className="story-label text-[#efe9dd]">KZ / 2026</a>
    <nav className="hidden gap-8 md:flex">{s.nav.map(([label, href]: string[]) => <a key={href} href={href} className="story-label text-[#71787c] hover:text-[#efe9dd]">{label}</a>)}</nav>
    <div className="flex gap-1 rounded-full border border-[#efe9dd]/15 p-1">{(["CN", "EN"] as Lang[]).map(item => <button key={item} onClick={() => setLang(item)} className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-[.16em] ${lang === item ? "bg-[#efe9dd] text-[#090b0d]" : "text-[#71787c]"}`}>{item}</button>)}</div>
  </div></header>;
}

function Dock({ t }: { t: any }) {
  const items = [{ label: t.dock.phone, icon: Smartphone, href: "tel:13568009560" }, { label: t.dock.email, icon: Mail, href: "mailto:1162135252@qq.com" }, { label: t.dock.linkedin, icon: Linkedin, href: "https://www.linkedin.com/in/kesi-zhu" }, { label: t.dock.resume, icon: FileText, href: "/CV_simplyfy_KesiZhu.pdf" }];
  return <div className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2"><div className="flex gap-1 rounded-full border border-[#efe9dd]/20 bg-[#0a0c0e]/90 p-1.5 shadow-2xl backdrop-blur-xl">{items.map(({ label, icon: Icon, href }) => <a key={label} href={href} target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={label} className="group relative flex h-11 w-11 items-center justify-center rounded-full text-[#92989b] hover:bg-[#efe9dd] hover:text-[#090b0d]"><Icon className="h-[18px] w-[18px]" /><span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded bg-[#efe9dd] px-2 py-1 text-[10px] font-bold text-[#090b0d] opacity-0 group-hover:opacity-100">{label}</span></a>)}</div></div>;
}

function Experience({ exp, index }: { exp: any; index: number }) {
  return <article className="grid gap-5 border-t border-[#141719]/15 py-7 md:grid-cols-[minmax(150px,.5fr)_1.5fr] md:py-9">
    <div><span className="story-label text-[#656b6e]">EVIDENCE {String(index + 1).padStart(2, "0")}</span><p className="mt-3 font-mono text-xs text-[#656b6e]">{exp.period}</p></div>
    <div><div className="flex flex-col justify-between gap-3 md:flex-row"><div><h4 className="text-xl font-black tracking-[-.025em] md:text-2xl">{exp.company}</h4><p className="mt-1 text-sm font-semibold text-[#555c60]">{exp.role}</p></div><div className="flex flex-wrap gap-1.5 md:max-w-[45%] md:justify-end">{exp.tags.map((tag: string) => <span key={tag} className="rounded-full border border-[#15191b]/15 px-2.5 py-1 font-mono text-[9px] text-[#555c60]">{tag}</span>)}</div></div><p className="mt-5 max-w-3xl text-sm leading-7 text-[#4d5458] md:text-base md:leading-8">{exp.detail}</p></div>
  </article>;
}

function Act({ act, experiences, index }: { act: any; experiences: any[]; index: number }) {
  return <section className={`story-act story-act-${act.tone} border-b border-[#090b0d]/10 px-5 py-24 text-[#111416] md:px-10 md:py-32 lg:px-[6vw]`}><div className="mx-auto max-w-[1500px]"><Reveal className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
    <div className="lg:sticky lg:top-28 lg:self-start"><div className="flex items-center gap-4"><span className="story-label">{act.no}</span><span className="h-px flex-1 bg-[#111416]/20" /><span className="font-mono text-[10px] text-[#4f5659]">{act.year}</span></div><div className="mt-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#111416]/25 font-serif text-2xl italic">{index + 1}</div><h3 className="story-serif mt-7 max-w-xl text-5xl leading-[.95] tracking-[-.055em] md:text-7xl">{act.title}</h3></div>
    <div className="lg:pt-20"><p className="max-w-3xl text-2xl font-black leading-[1.18] tracking-[-.035em] md:text-4xl">{act.lead}</p><p className="mt-8 max-w-2xl text-base leading-8 text-[#42494c] md:text-lg md:leading-9">{act.body}</p><div className="mt-14 border-y border-[#111416]/15">{act.entries.map((entry: number, order: number) => <Experience key={entry} exp={experiences[entry]} index={order} />)}</div><div className="mt-10 grid gap-4 border-l-2 border-[#111416] pl-6 md:grid-cols-[120px_1fr]"><span className="story-label text-[#555c60]">WHAT CHANGED</span><p className="story-serif text-xl italic leading-8 md:text-2xl">{act.bridge}</p></div></div>
  </Reveal></div></section>;
}

function Project({ project, proof }: { project: any; proof: string }) {
  const card = <article className="group grid h-full grid-rows-[auto_1fr] overflow-hidden border border-[#efe9dd]/14 bg-[#0d1012] hover:border-[#9ce3be]/50"><div className="relative aspect-[16/10] overflow-hidden border-b border-[#efe9dd]/10 bg-[#121619]">{project.image ? <Image src={project.image} alt={project.name} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-75 grayscale-[25%] transition-all duration-700 group-hover:scale-[1.035] group-hover:opacity-100 group-hover:grayscale-0" /> : project.video ? <video src={project.video} autoPlay loop muted playsInline className="h-full w-full object-cover opacity-75 group-hover:opacity-100" /> : null}<div className="absolute inset-x-0 top-0 flex justify-between bg-gradient-to-b from-black/75 to-transparent p-4"><span className="story-label text-white/80">{project.id} / {project.type}</span><span className="rounded-full border border-white/25 bg-black/35 px-2 py-1 font-mono text-[9px] text-white">{project.statLabel}</span></div></div><div className="flex flex-col p-6 md:p-7"><p className="story-label text-[#9ce3be]">PROVES / {proof}</p><h4 className="mt-4 text-2xl font-black tracking-[-.035em]">{project.name}</h4><p className="mt-3 flex-1 text-sm leading-7 text-[#93999c]">{project.desc}</p><div className="mt-7 flex justify-between border-t border-[#efe9dd]/10 pt-4 text-xs font-bold uppercase tracking-[.12em]"><span>{project.cta}</span><ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div></article>;
  return project.link ? <Link href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} className="block h-full">{card}</Link> : <div className="h-full">{card}</div>;
}

export default function EditorialHome({ content }: Props) {
  const [lang, setLang] = useState<Lang>("CN");
  const t = content[lang];
  const s = copy[lang];
  return <main className="story-shell min-h-screen overflow-hidden bg-[#090b0d] text-[#efe9dd] selection:bg-[#9ce3be] selection:text-[#090b0d]">
    <FolderIntroPrototype eyebrow={s.eyebrow} lang={lang} location={t.hero.location} issue={s.issue} scroll={s.scroll} statement={s.statement} thesis={s.thesis} facts={s.facts} />
    <TopBar lang={lang} setLang={setLang} s={s} />

    <section id="top"><PaperHero eyebrow={s.eyebrow} facts={s.facts} issue={s.issue} location={t.hero.location} scroll={s.scroll} statement={s.statement} thesis={s.thesis} /></section>

    <section id="question" className="bg-[#efe9dd] px-5 py-28 text-[#111416] md:px-10 md:py-40 lg:px-[6vw]"><div className="mx-auto max-w-[1500px]"><Reveal><div className="flex items-center gap-5"><span className="story-label text-[#697074]">{s.qLabel}</span><span className="h-px flex-1 bg-[#111416]/20" /></div><h2 className="story-serif mt-14 max-w-[1250px] text-[clamp(3.8rem,8vw,9.5rem)] leading-[.88] tracking-[-.065em]">{s.question.map((line: string, index: number) => <span key={line} className={`block ${index === 2 ? "italic text-[#167b57]" : ""}`}>{line}</span>)}</h2><p className="mt-12 max-w-xl text-base leading-8 text-[#555c60] md:ml-auto md:text-lg md:leading-9">{s.qNote}</p></Reveal><div className="mt-24 grid border-y border-[#111416]/18 md:grid-cols-3">{s.principles.map(([label, title, desc]: string[], index: number) => <Reveal key={label} delay={index * .08} className="border-b border-[#111416]/15 p-7 md:border-b-0 md:border-r md:p-9 md:last:border-r-0"><span className="story-label text-[#697074]">{label}</span><h3 className="story-serif mt-8 text-4xl italic">{title}</h3><p className="mt-4 text-sm leading-7 text-[#555c60] md:text-base">{desc}</p></Reveal>)}</div></div></section>

    <section id="formation" className="border-b border-[#efe9dd]/10 px-5 py-20 md:px-10 md:py-28 lg:px-[6vw]"><Reveal className="mx-auto grid max-w-[1500px] gap-8 md:grid-cols-[1fr_.7fr] md:items-end"><div><span className="story-label text-[#9ce3be]">FORMATION / 03 ACTS</span><h2 className="story-serif mt-5 text-5xl tracking-[-.05em] md:text-8xl">{s.formation}</h2></div><p className="max-w-lg text-base leading-8 text-[#92989b] md:justify-self-end md:text-lg">{s.formationNote}</p></Reveal></section>
    {s.acts.map((act: any, index: number) => <Act key={act.no} act={act} experiences={t.experience} index={index} />)}

    <section className="bg-[#090b0d] px-5 py-28 md:px-10 md:py-40 lg:px-[6vw]"><Reveal className="mx-auto max-w-[1300px] border border-dashed border-[#f2a15f]/55 bg-[#f2a15f]/[.04] p-6 md:p-12"><div className="flex flex-col gap-6 border-b border-[#efe9dd]/12 pb-8 md:flex-row md:justify-between"><div><span className="story-label text-[#f2a15f]">{s.judgment[0]}</span><h2 className="story-serif mt-5 max-w-3xl text-4xl tracking-[-.045em] md:text-6xl">{s.judgment[1]}</h2></div><span className="h-fit rounded-full border border-[#f2a15f]/40 px-3 py-2 story-label text-[#f2a15f]">WORKING PRINCIPLE 01</span></div><p className="mt-8 max-w-2xl text-base leading-8 text-[#a6abad] md:text-lg">{s.judgment[2]}</p><div className="mt-10 grid gap-px overflow-hidden border border-[#efe9dd]/10 bg-[#efe9dd]/10 md:grid-cols-4">{(s.judgment[3] as string[]).map((prompt: string, index: number) => <div key={prompt} className="min-h-36 bg-[#0b0e10] p-5"><span className="story-label text-[#666d70]">0{index + 1}</span><p className="mt-8 text-sm font-semibold text-[#c6c2ba]">{prompt}</p><span className="mt-5 block h-px bg-[#efe9dd]/10" /></div>)}</div><p className="mt-5 font-mono text-[10px] text-[#666d70]">{s.judgment[4]}</p></Reveal></section>

    <section id="evidence" className="bg-[#0d1012] px-5 py-24 md:px-10 md:py-32 lg:px-[6vw]"><div className="mx-auto max-w-[1500px]"><Reveal className="grid gap-8 border-t border-[#efe9dd]/15 pt-6 md:grid-cols-[1fr_.7fr]"><div><span className="story-label text-[#9ce3be]">PROFESSIONAL INDEX</span><h2 className="story-serif mt-5 text-5xl tracking-[-.05em] md:text-8xl">{s.evidence}</h2></div><p className="max-w-lg text-base leading-8 text-[#92989b] md:justify-self-end">{s.evidenceNote}</p></Reveal>
      <div className="mt-24"><div className="flex items-center gap-4 border-b border-[#efe9dd]/15 pb-4"><span className="story-label">01 / {s.skills}</span><span className="h-px flex-1 bg-[#efe9dd]/10" /></div><div className="grid md:grid-cols-2">{t.skills.map((skill: any, index: number) => <Reveal key={skill.title} className="border-b border-[#efe9dd]/12 p-6 md:min-h-[300px] md:border-r md:p-9"><div className="flex justify-between gap-4"><span className="story-serif text-5xl italic text-[#444b4e]">0{index + 1}</span><div className="flex max-w-[70%] flex-wrap justify-end gap-1.5">{skill.tags.map((tag: string) => <span key={tag} className="rounded-full border border-[#efe9dd]/12 px-2.5 py-1 font-mono text-[9px] text-[#777e81]">{tag}</span>)}</div></div><h3 className="mt-10 text-2xl font-black">{skill.title}</h3><p className="mt-4 max-w-xl text-sm leading-7 text-[#92989b] md:text-base">{skill.desc}</p></Reveal>)}</div></div>
      <div className="mt-28"><div className="flex items-center gap-4 border-b border-[#efe9dd]/15 pb-4"><span className="story-label">02 / {s.projects}</span><span className="h-px flex-1 bg-[#efe9dd]/10" /></div><div className="mt-7 grid gap-5 md:grid-cols-2">{t.projects.map((project: any, index: number) => <Reveal key={project.id}><Project project={project} proof={s.proofs[index]} /></Reveal>)}</div></div>
    </div></section>

    <section className="story-ending relative bg-[#efe9dd] px-5 py-28 text-[#111416] md:px-10 md:py-44 lg:px-[6vw]"><div className="story-noise pointer-events-none absolute inset-0 opacity-20" /><Reveal className="relative mx-auto max-w-[1300px]"><span className="story-label text-[#167b57]">{s.endingLabel}</span><p className="story-serif mt-8 max-w-[1200px] text-[clamp(3rem,6.8vw,7.8rem)] leading-[.96] tracking-[-.055em]">{s.ending}</p><div className="mt-14 grid gap-8 border-t border-[#111416]/18 pt-7 md:grid-cols-[1fr_auto] md:items-end"><p className="max-w-xl text-sm leading-7 text-[#555c60] md:text-base">{s.endingNote}</p><a href="/CV_simplyfy_KesiZhu.pdf" target="_blank" className="flex w-fit items-center gap-3 border-b border-[#111416] pb-2 text-sm font-black uppercase tracking-[.12em] hover:text-[#167b57]">{s.resume}<ArrowUpRight className="h-4 w-4" /></a></div></Reveal></section>
    <footer className="px-5 pb-32 pt-10 md:px-10 lg:px-[6vw]"><div className="mx-auto flex max-w-[1500px] flex-col gap-3 border-t border-[#efe9dd]/12 pt-6 story-label text-[#5d6467] md:flex-row md:justify-between"><span>{t.footer.copyright}</span><span>{t.footer.status}</span></div></footer>
    <Dock t={t} />
  </main>;
}
