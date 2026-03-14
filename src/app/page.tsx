"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Mail,
  Linkedin,
  Cpu,
  Layers,
  Zap,
  Check,
  Globe,
  ArrowUpRight,
  Terminal,
  Activity,
  Box,
  Command,
  FileText,
  MousePointer2,
  Database,
  Code2,
  Sparkles,
} from "lucide-react";

// ─── Data (Multi-language) ────────────────────────────────────────────────────

type Lang = "EN" | "CN";

const content = {
  EN: {
    hero: {
      name: "COZY ZHU",
      firstName: "COZY",
      lastName: "ZHU",
      role: "AI PRODUCT MANAGER",
      subRole: "INNOVATION & COMMERCIALIZATION",
      status: "SYSTEM ONLINE",
      version: "KESI_OS_v2.5",
      location: "ZHEJIANG UNIV. M.Des (2027)",
      currentRoleLabel: "CURRENT ROLE",
      intro: [
        "Co-Founder of 2 AI Startups. Previously PM at iFLYTEK & Hello Inc. 3 EI/IEEE Papers. 20+ Awards.",
      ],
      tags: ["AIGC", "AI ENGINEERING", "DATA EVALUATION", "START-UP"],
    },
    sections: {
      metrics: "IMPACT_METRICS",
      skills: "CORE_COMPETENCIES",
      experience: "PROFESSIONAL_LOG",
      projects: "SELECTED_WORKS",
    },
    skills: [
      {
        title: "AI ENGINEERING",
        tags: ["AI Coding", "LLM Eval", "Multimodal", "AIGC Workflow"],
        desc: "End-to-end multimodal workflow construction, reducing single-function cost by 70%. AI toolchain secondary development.",
      },
      {
        title: "PRODUCT STRATEGY",
        tags: ["B2B/SaaS Arch", "MVP Validation", "QFD Model", "SQL"],
        desc: "Defined asset data structure for 'Otter's Home'. Established quantitative experience evaluation system for Hello Inc.",
      },
      {
        title: "UX & PROTOTYPING",
        tags: ["Figma", "Axure", "UX Iteration", "Kano Model"],
        desc: "Refactored iFLYTEK AI Healthcare B/G-end interfaces. Led UX prototyping for 'Otter's Home'.",
      },
      {
        title: "GLOBAL RESEARCH",
        tags: ["Business Analytics", "Cross-border Collab"],
        desc: "3 EI/IEEE papers. NTU AI Business Analytics, KTH Exchange, THS Global & Armarda.",
      },
    ],
    experience: [
      {
        company: "SINGULARITY LEAP · START-UP",
        role: "CO-FOUNDER",
        period: "2025.06-2026.03",
        tags: ["0-1 OWNER", "AIGC", "SAAS"],
        detail: "Otter's Home AIGC Interior Design SaaS. 1-min generation. Built B2B2C model & asset mgmt system. Microsoft Fund supported.",
      },
      {
        company: "ACUISPIRE · HK INDUSTRY-UNIVERSITY",
        role: "CO-FOUNDER",
        period: "2025.03-2026.06",
        tags: ["AGENT", "AI FLOW", "INTERACTION"],
        detail: "PiLive Cross-border Livestream AI Tool. Product & AI Engineer. Joint paper with PolyU NVIDIA Lab. ByteDance AI platform supported.",
      },
      {
        company: "IFLYTEK",
        role: "PM INTERN (AI HEALTHCARE)",
        period: "2023.12-2024.02",
        tags: ["B-END", "CDSS", "VTE"],
        detail: "Deep involvement in CDSS, VTE, and Medical Record QC systems. Requirements definition & iteration for provincial-level hospital systems.",
      },
      {
        company: "HELLO INC",
        role: "PM INTERN (IOT HARDWARE)",
        period: "2024.03-2024.08",
        tags: ["DATA ANALYSIS", "QFD", "MVP"],
        detail: "Hardware accessory innovation MVP. Increased turnover rate by ~2%. Established internal quantitative evaluation metrics using QFD.",
      },
    ],
    projects: [
      {
        id: "01",
        name: "OTTER'S HOME",
        type: "AI INTERIOR SAAS",
        stat: "MS FUND",
        statLabel: "SUPPORTED",
        desc: "AI-driven interior design generation platform. 1-minute rendering workflow.",
        link: "/projects/otters-home",
        cta: "VIEW CASE STUDY",
        image: "/assets/tatadajia_cover.png",
      },
      {
        id: "02",
        name: "PILIVE",
        type: "LIVESTREAM AI AGENT",
        stat: "TOP 3",
        statLabel: "POTENTIAL AWARD",
        desc: "Real-time goods recognition & interaction growth tool for cross-border livestreaming.",
        link: "/projects/pilive",
        cta: "VIEW CASE STUDY",
        image: "/assets/Pilive_cover.png",
      },
      {
        id: "03",
        name: "LEARNING AGENT",
        type: "OPEN SOURCE",
        stat: "BUILDING",
        statLabel: "IN PROGRESS",
        desc: "Efficiency agent integrating full-site information. Currently under development.",
        link: "https://github.com/bohemiaer/PWA-stairt",
        cta: "COMING SOON",
        image: "/assets/LearningAgent_cover.png",
      },
      {
        id: "04",
        name: "FOCUS TIMER",
        type: "CODING WITH UNITY",
        stat: "OPEN SOURCE",
        statLabel: "OPEN SOURCE",
        desc: "Gamified Pomodoro timer developed with Unity engine.",
        cta: "CONCEPT ONLY",
        video: "/assets/Unity.webm",
      },
    ],
    footer: {
      end: "END OF LINE.",
      status: "SYSTEM STATUS: NORMAL • LATENCY: 12ms",
      copyright: "© 2025 COZY ZHU • ALL SYSTEMS OPERATIONAL",
    },
    dock: {
      phone: "PHONE",
      email: "EMAIL",
      linkedin: "LINKEDIN",
      resume: "RESUME",
      copied: "COPIED",
    }
  },
  CN: {
    hero: {
      name: "朱可思",
      firstName: "KESI",
      lastName: "ZHU",
      role: "AI 工程与商业化的创新型 | 产品经理",
      subRole: "创新产品与商业化落地",
      status: "系统在线",
      version: "KESI_OS_v2.5",
      location: "浙江大学 · 工业设计工程硕士 · 27届",
      currentRoleLabel: "当前角色",
      intro: [
        "2家 AI 创业公司联合创始人。曾在科大讯飞与哈啰出行担任 PM。发表 3 篇 EI/IEEE 论文，获 20+ 奖项。",
      ],
      tags: ["AIGC", "AI 工程化", "数据评估", "从0到1"],
    },
    sections: {
      metrics: "核心指标",
      skills: "核心能力",
      experience: "职业履历",
      projects: "精选项目",
    },
    skills: [
      {
        title: "AI 工程与评估",
        tags: ["AI Coding", "LLM 评估", "多模态", "AIGC工作流"],
        desc: "构建端到端的多模态工作流，单功能成本降低 70%；协助构建 AIGC 多模态评价系统，具备 AI 工具链二次开发能力。",
      },
      {
        title: "产品架构与策略",
        tags: ["B2B/SaaS 架构", "MVP 验证", "QFD 模型", "SQL"],
        desc: "从 0 到 1 定义“獭獭搭家”资产数据结构，驱动哈啰出行硬件体验量化评价体系建立。",
      },
      {
        title: "用户体验与原型",
        tags: ["Figma", "Axure", "体验迭代", "Kano 模型"],
        desc: "深度重构科大讯飞 AI 医疗系统 B/G 端界面逻辑；主导完成“獭獭搭家”UX 原型构建。",
      },
      {
        title: "国际视野与研究",
        tags: ["商业数据分析", "跨国协作"],
        desc: "发表 3 篇 EI/IEEE 国际论文；南洋理工 AI 商业分析训练营，瑞典皇家理工交换生。",
      },
    ],
    experience: [
      {
        company: "奇点跃迁 · Start—up",
        role: "联合创始人",
        period: "2025.06-2026.03",
        tags: ["从0到1", "AIGC", "SAAS"],
        detail: "獭獭搭家 AIGC 室内设计 SaaS。1分钟生成方案。构建 B2B2C 模式与资产系统。获微软创业基金支持。",
      },
      {
        company: "Acuispire · 香港产学研公司",
        role: "联合创始人",
        period: "2025.03-2026.06",
        tags: ["AGENT", "AI FLOW", "互动策略"],
        detail: "PiLive 跨境直播 AI 互动工具。作为产品和Ai Engineer。与港理 NVIDIA 实验室合著论文。获字节 AI 平台支持。",
      },
      {
        company: "科大讯飞 · iFLYTEK",
        role: "PM 实习生 (AI 医疗)",
        period: "2023.12-2024.02",
        tags: ["B端产品", "CDSS", "VTE"],
        detail: "深度参与 CDSS、VTE 及病历质控 3 大核心 B 端系统。负责省级医院系统的需求定义与迭代。",
      },
      {
        company: "哈啰出行 · Hello Inc",
        role: "PM 实习生 (智能硬件)",
        period: "2024.03-2024.08",
        tags: ["数据分析", "QFD", "MVP"],
        detail: "硬件配件创新 MVP。拉动翻台率提升约 2%。引入 QFD 模型建立量化内部评价指标。",
      },
    ],
    projects: [
      {
        id: "01",
        name: "獭獭搭家",
        type: "AI 家装 SAAS",
        stat: "微软基金",
        statLabel: "创业支持",
        desc: "AI 驱动的家装设计生成平台，1分钟极速渲染工作流。",
        link: "/projects/otters-home",
        cta: "查看案例",
        image: "/assets/tatadajia_cover.png",
      },
      {
        id: "02",
        name: "PiLive",
        type: "直播 AI AGENT",
        stat: "TOP 3",
        statLabel: "最具潜力奖",
        desc: "跨境直播实时商品识别与互动增长工具。",
        link: "/projects/pilive",
        cta: "查看案例",
        image: "/assets/Pilive_cover.png",
      },
      {
        id: "03",
        name: "Learning Agent",
        type: "Gitub开源",
        stat: "开发中",
        statLabel: "BUILDING",
        desc: "整合全站信息的效率智能体。目前正在开发中。",
        link: "https://github.com/bohemiaer/PWA-stairt",
        cta: "敬请期待",
        image: "/assets/LearningAgent_cover.png",
      },
      {
        id: "04",
        name: "Focus Timer",
        type: "CODING WITH UNITY",
        stat: "Gitub开源",
        statLabel: "Gitub开源",
        desc: "基于 Unity 引擎开发的游戏化番茄钟。",
        cta: "仅展示概念",
        video: "/assets/Unity.webm",
      },
    ],
    footer: {
      end: "END OF LINE.",
      status: "系统状态：正常 • 延迟：12ms",
      copyright: "© 2025 COZY ZHU • 所有系统运行正常",
    },
    dock: {
      phone: "电话",
      email: "邮箱",
      linkedin: "领英",
      resume: "简历",
      copied: "已复制",
    }
  }
};

// ─── Components ───────────────────────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Base Grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Radial Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/0 via-zinc-950/60 to-zinc-950" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}

function StatusBar({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-8 z-50 border-b border-white/5 bg-black/50 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
        <span className="micro-text font-bold tracking-widest">{t.hero.version}</span>
      </div>
      
      {/* Language Switcher */}
      <div className="flex items-center bg-zinc-900/80 border border-white/10 rounded-full p-1">
        <button
          onClick={() => setLang("EN")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all ${
            lang === "EN" ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLang("CN")}
          className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-widest transition-all ${
            lang === "CN" ? "bg-emerald-500/20 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          CN
        </button>
      </div>

      <div className="text-xs font-mono text-zinc-500 hidden md:block">{new Date().getFullYear()}</div>
    </motion.div>
  );
}

function SectionHeader({ title, index }: { title: string; index: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="text-[10px] font-mono text-emerald-500/80 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm border border-emerald-500/20">
        {index}
      </span>
      <h3 className="text-xs tracking-[0.25em] font-bold text-zinc-200 uppercase">{title}</h3>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
    </div>
  );
}

function Dock({ t }: { t: any }) {
  const dockItems = [
    { id: "phone", label: t.dock.phone, icon: Smartphone, href: "tel:131xxxxxxxx" },
    { id: "email", label: t.dock.email, icon: Mail, href: "mailto:kesizhu@example.com" },
    { id: "linkedin", label: t.dock.linkedin, icon: Linkedin, href: "https://www.linkedin.com/in/kesizhu/" },
    { id: "resume", label: t.dock.resume, icon: FileText, href: "/resume.pdf" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-3 md:gap-4 px-4 py-3 bg-zinc-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/80 ring-1 ring-white/10">
        {dockItems.map(({ id, label, icon: Icon, href }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group p-2 rounded-xl hover:bg-white/10 transition-all active:scale-95 flex flex-col items-center gap-1 min-w-[50px] md:min-w-[auto]"
          >
            <Icon className="w-6 h-6 text-zinc-200 group-hover:text-white transition-colors" aria-hidden="true" />
            <span className="text-xs font-medium text-zinc-400 md:hidden uppercase tracking-tight">{label}</span>
            <span className="hidden md:block absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-zinc-900 border border-white/10 text-xs font-bold tracking-wider text-zinc-300 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase shadow-xl">
              {label}
            </span>
            <div className="hidden md:block absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0.5 h-0.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </div>
  );
}

function HeroIntro({ text, tags }: { text: string[]; tags: string[] }) {
  // Highlight helper
  const highlightKeywords = (str: string) => {
    const keywords = ["AIGC", "AI 工程化", "数据评估", "从0到1"];
    // Split by keywords but keep them
    const regex = new RegExp(`(${keywords.join("|")})`, "g");
    const parts = str.split(regex);
    return parts.map((part, i) =>
      keywords.includes(part) ? (
        <span key={i} className="text-emerald-400 font-medium">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="border-t border-white/10 pt-6">
      <div className="text-base md:text-lg leading-relaxed text-zinc-400 max-w-lg mb-6 font-sans">
        {text.map((paragraph, i) => (
          <p key={i} className="mb-2">
            {highlightKeywords(paragraph)}
          </p>
        ))}
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-sm text-zinc-500 hover:text-emerald-400 transition-colors cursor-default font-mono tracking-wide"
          >
            [{tag}]
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [lang, setLang] = useState<Lang>("CN");
  const t = content[lang];
  
  // Unified font class
  const fontClass = "font-sans";

  return (
    <main className={`relative min-h-screen text-zinc-300 selection:bg-emerald-500/30 selection:text-emerald-100 pb-40 ${fontClass}`}>
      <GridBackground />
      <StatusBar lang={lang} setLang={setLang} t={t} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 md:pt-40">
        {/* HERO SECTION */}
        <motion.section
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="mb-32 relative"
        >
          {/* Decorative bracket lines */}
          <div className="absolute -left-6 top-0 h-full w-px bg-gradient-to-b from-white/20 via-transparent to-transparent hidden md:block" />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="micro-text text-emerald-500 mb-3 flex items-center gap-2 text-sm md:text-base tracking-widest">
                <span className="w-2 h-2 bg-emerald-500 rounded-sm" />
                {t.hero.location}
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white leading-[0.9] mix-blend-screen mb-2">
                {t.hero.firstName}
                <br />
                <span className="text-zinc-600">{t.hero.lastName}</span>
              </h1>
            </div>
            <div className="md:text-right">
              <div className="micro-text text-zinc-500 mb-2 text-xs md:text-sm tracking-widest">{t.hero.currentRoleLabel}</div>
              <div className="text-lg md:text-xl font-bold text-white tracking-widest">{t.hero.role}</div>
            </div>
          </div>

          <HeroIntro text={t.hero.intro} tags={t.hero.tags} />
        </motion.section>

        {/* SKILLS */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <SectionHeader index="01" title={t.sections.skills} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.skills.map((s, i) => (
              <div key={i} className="group p-8 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-white/10 hover:-translate-y-1 duration-300">
                <h4 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors flex items-center gap-3">
                  <span className="w-2 h-2 bg-zinc-600 rounded-full group-hover:bg-emerald-500 transition-colors" />
                  {s.title}
                </h4>
                
                <div className="flex flex-wrap gap-2.5 mb-6">
                  {s.tags.map((tag, j) => (
                    <span 
                      key={j} 
                      className="text-sm px-3 py-1.5 rounded-full bg-zinc-900/50 border border-white/10 text-zinc-400 font-mono tracking-tight group-hover:border-white/20 group-hover:text-zinc-300 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-base leading-relaxed text-zinc-400 border-t border-dashed border-white/10 pt-4">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* EXPERIENCE */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mb-32"
        >
          <SectionHeader index="02" title={t.sections.experience} />
          <div className="space-y-0 border-l border-white/10 ml-2">
            {t.experience.map((exp, i) => (
              <div key={i} className="relative pl-10 pb-16 last:pb-0 group">
                <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-zinc-800 rounded-full ring-4 ring-black group-hover:bg-emerald-500 transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-3">
                  <h4 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tight">
                    {exp.company}
                  </h4>
                  <span className="text-base font-mono text-zinc-500">{exp.period}</span>
                </div>
                
                <div className="text-sm font-bold text-zinc-400 mb-4 tracking-wider uppercase bg-zinc-900/50 inline-block px-3 py-1.5 rounded border border-white/5">
                  {exp.role}
                </div>
                
                <div className="flex gap-2 mb-4">
                  {exp.tags.map((t, j) => (
                    <span key={j} className="text-sm px-3 py-1 border border-white/10 rounded-md text-zinc-500 font-mono bg-zinc-900/30">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-zinc-400 max-w-4xl">
                  {exp.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* PROJECTS (Enhanced with Tilt & Cover) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <SectionHeader index="03" title={t.sections.projects} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.projects.map((p) => {
              const CardContent = (
                <motion.div
                  whileHover={{ y: -5, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative border border-white/5 bg-zinc-900/20 rounded-xl overflow-hidden hover:border-white/15 hover:bg-zinc-900/40 transition-all cursor-pointer shadow-lg shadow-black/20 h-full flex flex-col"
                >
                  {/* Project Cover - 3:2 Aspect Ratio */}
                  <div className="aspect-[3/2] overflow-hidden relative border-b border-white/5 bg-zinc-950 shrink-0">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-700"
                      />
                    ) : p.video ? (
                      <video
                        src={p.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700 micro-text tracking-widest text-xs">
                         NO SIGNAL
                       </div>
                    )}
                    
                    {/* Badge - Positioned inside image */}
                    <div className="absolute top-3 right-3 z-10">
                       <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-[4px] text-[10px] font-bold text-white tracking-wider flex items-center gap-1.5 shadow-lg">
                         <span className={`w-1.5 h-1.5 rounded-full ${p.id === '03' ? 'bg-amber-500' : p.id === '04' ? 'bg-zinc-500' : 'bg-emerald-500'}`} />
                         {p.statLabel}
                       </div>
                    </div>
                  </div>

                  {/* Content - Below Image */}
                  <div className="p-8 bg-white/[0.01] backdrop-blur-sm relative border-t border-white/5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="text-xs text-emerald-500/80 mb-2 tracking-widest uppercase font-bold">{p.type}</div>
                        <h3 className="text-2xl font-bold text-zinc-100 tracking-tight group-hover:text-emerald-50 transition-colors leading-tight">
                          {p.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-base leading-relaxed text-zinc-400 mb-6 line-clamp-3 group-hover:text-zinc-300 transition-colors flex-1">
                      {p.desc}
                    </p>

                    {p.link ? (
                      <div className="flex items-center gap-2 text-sm font-medium text-zinc-500 group-hover:text-white transition-colors mt-auto">
                        <span className="tracking-widest border-b border-transparent group-hover:border-white transition-colors pb-0.5 uppercase">
                          {p.cta}
                        </span>
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    ) : (
                      <div className="micro-text text-zinc-700 cursor-not-allowed text-xs mt-auto">
                        {p.cta}
                      </div>
                    )}
                  </div>
                </motion.div>
              );

              return p.link ? (
                <Link key={p.id} href={p.link} className="block h-full">
                  {CardContent}
                </Link>
              ) : (
                <div key={p.id} className="block h-full">
                  {CardContent}
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* FOOTER CTA */}
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="mt-32 p-10 border border-dashed border-white/10 rounded-xl text-center bg-white/[0.01]"
        >
           <h3 className="text-zinc-500 text-sm tracking-[0.5em] font-mono mb-0">{t.footer.end}</h3>
        </motion.div>

        <footer className="mt-20 pt-10 border-t border-white/10 text-center micro-text text-zinc-600 font-mono text-xs">
          <div className="mb-2 tracking-widest">{t.footer.status}</div>
          <div className="tracking-widest">{t.footer.copyright}</div>
        </footer>
      </div>

      <Dock t={t} />
    </main>
  );
}
