"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";

// ─── Data (sourced from content/Main.md) ─────────────────────────────────────

const hero = {
  h1a: "AI 工程与商业化的",
  h1b: "创新型产品经理",
  h2: `浙江大学27届工业设计工程硕士。2家AI Start up联合创始人，主导AI家装与跨境直播 SaaS 产品从 0 到 1。曾在头部大厂（AI 医疗、共享出行）担任 PM，获20+ 计算机/设计/创业类奖项，发表 3 篇 EI/IEEE 收录国际论文，参与2项Global项目。`,
  tags: ["AIGC", "AI Engineering", "Data Evaluation", "Start-up"],
  email: "SWEcozyzhu@gmail.com",
  wechatQR: "/assets/WeixinQR.jpg",
  linkedin: "https://www.linkedin.com/in/kesi-zhu",
  resumeUrl: "/assets/CV_simplyfy_KesiZhu.pdf",
};

// col-span index: 0→2, 1→1, 2→1, 3→2 (asymmetric bento)
const skills = [
  {
    id: "ai",
    colSpan: "md:col-span-2",
    title: "AI 工程与评估",
    subtitle: "AI Engineering & Evaluation",
    tags: ["AI Coding", "LLM 评估", "多模态", "AIGC工作流"],
    impact: `构建端到端的多模态工作流，单功能成本降低 70%；协助构建AIGC多模态评价系统，具备 AI 工具链重度使用与二次开发能力。`,
    metric: { value: 70, unit: "%", label: "单功能成本降低" },
    accent: "#06b6d4",
  },
  {
    id: "product",
    colSpan: "md:col-span-1",
    title: "产品架构与数据策略",
    subtitle: "Product & Data Strategy",
    tags: ["B2B/SaaS 架构设计", "MVP 快速验证", "QFD 评价模型", "SQL"],
    impact: `从 0 到 1 定义"獭獭搭家"资产数据结构，驱动哈啰出行硬件体验量化评价体系建立。`,
    accent: "#8b5cf6",
  },
  {
    id: "ux",
    colSpan: "md:col-span-1",
    title: "用户体验与原型",
    subtitle: "UX & Prototyping",
    tags: ["Figma", "Axure", "UI/UX 迭代", "Kano 模型"],
    impact: `深度重构科大讯飞 AI 医疗系统复杂 B/G 端界面逻辑；主导完成"獭獭搭家"UX 原型构建。`,
    accent: "#06b6d4",
  },
  {
    id: "global",
    colSpan: "md:col-span-2",
    title: "国际视野与研究",
    subtitle: "Global & Research",
    tags: ["商业数据分析", "跨国项目协同"],
    impact: `发表 3 篇 EI/IEEE 国际学术论文；南洋理工AI商业分析训练营，KTH 瑞典皇家理工交换生，THS Global & Armarda。`,
    accent: "#8b5cf6",
  },
];

const experience = [
  {
    id: "singularity",
    company: "奇点跃迁 · Singularity Leap",
    role: "联合创始人",
    period: "2023–2024",
    tags: ["从0到1", "AIGC", "SaaS平台", "产品架构"],
    desc: `"獭獭搭家"AIGC 室内设计 SaaS 平台，1分钟生成家装方案；创新打造 B2B2C 商业模式，为装企提供资产管理系统，获 Microsoft Fund 创业基金支持。`,
    slug: "otters-home",
  },
  {
    id: "acuispire",
    company: "Acuispire · HK",
    role: "联合创始人",
    period: "2024",
    tags: ["Agent", "互动策略", "AI Flow"],
    desc: `"Pilive"聚焦跨境直播场景，构建 AI 实时商品识别与互动增长系统；与港理工 NVIDIA 联合实验室合著论文，获 ByteDance AI 服务平台支持，杭州良仓最具投资潜力奖。`,
    slug: "pilive",
  },
  {
    id: "iflytek",
    company: "科大讯飞 · iFLYTEK",
    role: "PM 实习生 · AI医疗线",
    period: "2023",
    tags: ["B端产品", "上线研测", "节点化设计"],
    desc: `深度参与 CDSS、VTE 及病历质控 3 大核心 B 端系统的需求定义与迭代，完成从医院到省政府级的复杂业务逻辑梳理与原型设计。`,
  },
  {
    id: "hello",
    company: "哈啰出行 · Hello Inc.",
    role: "PM 实习生 · 硬件两轮",
    period: "2022",
    tags: ["竞品策略", "数据分析", "MVP验证"],
    desc: `多项硬件配件创新 MVP 测试，拉动两轮翻台率提升约 2%；引入 QFD 模型建立量化内部评价指标，搭建行业头部竞品标准库。`,
    metric: { value: 2, unit: "%", label: "翻台率提升" },
  },
];

const projects = [
  {
    id: "otters",
    title: "獭獭搭家",
    titleEn: "Otter's Home",
    desc: "AI 驱动的家装 SaaS 平台",
    tags: ["AIGC", "B2B2C", "Microsoft Fund"],
    year: "2024",
    image: "/assets/tatadajia_cover.png",
    slug: "otters-home",
  },
  {
    id: "pilive",
    title: "PiLive",
    titleEn: "PiLive",
    desc: "跨境直播 AI 互动增长工具",
    tags: ["Agent", "ByteDance", "NTU"],
    year: "2024",
    image: "/assets/Pilive_cover.png",
    slug: "pilive",
  },
  {
    id: "agent",
    title: "Learning Agent",
    titleEn: "Learning Agent",
    desc: "正在 Building 的开源学习工具",
    tags: ["Open Source", "AI Agent"],
    year: "2025",
    image: "/assets/LearningAgent_cover.png",
  },
  {
    id: "focus",
    title: "Emoji 专注工具",
    titleEn: "Focus Timer",
    desc: "基于 Unity 开发的番茄闹钟",
    tags: ["Unity", "UX Concept"],
    year: "2024",
    video: "/assets/Unity.webm",
  },
];

// ─── Hook: count-up ───────────────────────────────────────────────────────────

function useCountUp(end: number, inView: boolean, duration = 1.2) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || end === 0) return;
    let rafId: number;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / (duration * 1000), 1);
      setCount(Math.round(p * end));
      if (p < 1) rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, inView, duration]);
  return count;
}

// ─── Streaming H1 (LLM effect, ≤ 1.0s) ──────────────────────────────────────

function StreamingH1() {
  const chars = [...(hero.h1a + "\n" + hero.h1b)]; // Unicode-safe split
  const [count, setCount] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [cursorOn, setCursorOn] = useState(true);

  useEffect(() => {
    const perChar = 950 / chars.length; // total ~950 ms
    let i = 0;
    const typing = setInterval(() => {
      i++;
      setCount(i);
      if (i >= chars.length) {
        clearInterval(typing);
        // Blink 3 times (6 toggles × 280 ms each)
        let b = 0;
        const blink = setInterval(() => {
          setCursorOn((v) => !v);
          b++;
          if (b >= 6) {
            clearInterval(blink);
            setCursorVisible(false);
          }
        }, 280);
      }
    }, perChar);
    return () => clearInterval(typing);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const text = chars.slice(0, count).join("");
  const nl = text.indexOf("\n");
  const line1 = nl >= 0 ? text.slice(0, nl) : text;
  const line2 = nl >= 0 ? text.slice(nl + 1) : "";

  const cursor = cursorVisible ? (
    <span
      className="inline-block rounded-sm align-middle ml-0.5"
      style={{
        width: "3px",
        height: "0.82em",
        background: "white",
        opacity: cursorOn ? 1 : 0,
        transition: "opacity 0.08s",
        verticalAlign: "middle",
      }}
    />
  ) : null;

  return (
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white mb-6">
      {line1}
      {nl < 0 && cursor}
      {nl >= 0 && (
        <>
          <br />
          <span className="gradient-text">{line2}</span>
          {cursor}
        </>
      )}
    </h1>
  );
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Badge({ label }: { label: string }) {
  return <span className="glass-badge">{label}</span>;
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-[11px] font-semibold tracking-[0.25em] text-zinc-600 uppercase">
        {label}
      </span>
      <div className="flex-1 h-px bg-zinc-800" />
    </div>
  );
}

// ─── Skill card (poker flip + mouse spotlight) ────────────────────────────────

function SkillCard({
  skill,
  index,
  sectionInView,
}: {
  skill: (typeof skills)[number];
  index: number;
  sectionInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const count = useCountUp(skill.metric?.value ?? 0, sectionInView);
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true });
  }

  return (
    <motion.div
      className={skill.colSpan}
      style={{ transformStyle: "preserve-3d" }}
      initial={{ rotateY: -90, opacity: 0 }}
      animate={sectionInView ? { rotateY: 0, opacity: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 22,
        delay: index * 0.1,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
        className="glass-card p-6 h-full relative cursor-default"
      >
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: spot.on ? 1 : 0,
            background: `radial-gradient(200px circle at ${spot.x}px ${spot.y}px, ${skill.accent}18, transparent 70%)`,
          }}
        />

        {/* Metric counter */}
        {skill.metric && (
          <div className="absolute top-5 right-6 text-right hidden sm:block">
            <div
              className="text-2xl font-bold tabular-nums"
              style={{ color: skill.accent }}
            >
              {count}
              {skill.metric.unit}
            </div>
            <div className="text-[10px] text-zinc-600 mt-0.5">
              {skill.metric.label}
            </div>
          </div>
        )}

        <h3 className="text-white font-semibold text-base mb-1">{skill.title}</h3>
        <p className="text-zinc-600 text-[11px] mb-4">{skill.subtitle}</p>

        <div className="flex flex-wrap gap-1.5 mb-5">
          {skill.tags.map((t) => (
            <Badge key={t} label={t} />
          ))}
        </div>

        <p className="text-sm text-zinc-500 leading-relaxed border-t border-zinc-800 pt-4">
          ↳ {skill.impact}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Experience card ──────────────────────────────────────────────────────────

function ExperienceCard({
  item,
  index,
}: {
  item: (typeof experience)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(item.metric?.value ?? 0, inView);

  return (
    <FadeUp delay={index * 0.08}>
      <div ref={ref} className="glass-card p-6 relative">
        {/* Timeline dot */}
        <div className="absolute -left-[42px] top-7 w-2.5 h-2.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 hidden md:block" />

        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-white font-semibold text-base">{item.company}</h3>
            <p className="text-zinc-500 text-sm mt-0.5">{item.role}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            {item.metric && (
              <span className="text-sm font-semibold text-cyan-400">
                +{count}
                {item.metric.unit} {item.metric.label}
              </span>
            )}
            <span className="text-zinc-700 text-xs font-mono">{item.period}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((t) => (
            <Badge key={t} label={t} />
          ))}
        </div>

        <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>

        {item.slug && (
          <Link
            href={`/projects/${item.slug}`}
            className="inline-flex items-center gap-1 mt-4 text-xs text-cyan-500/60 hover:text-cyan-400 transition-colors"
          >
            查看案例 →
          </Link>
        )}
      </div>
    </FadeUp>
  );
}

// ─── Project card (grid + 3D hover) ──────────────────────────────────────────

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <FadeUp delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="group h-full flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-md overflow-hidden shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)] hover:border-zinc-600 transition-colors duration-300"
      >
        {/* Media */}
        <div className="overflow-hidden h-52 bg-zinc-950 flex-shrink-0">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity duration-500"
            />
          ) : project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={400}
              className="w-full h-full object-cover opacity-75 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-500"
            />
          ) : null}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.map((t) => (
              <Badge key={t} label={t} />
            ))}
          </div>

          <h3 className="text-white font-semibold text-lg leading-tight">
            {project.title}
            <span className="ml-2 text-zinc-600 text-sm font-normal">
              {project.titleEn}
            </span>
          </h3>
          <p className="text-zinc-400 text-sm mt-1 mb-4">{project.desc}</p>

          <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-800">
            <span className="text-zinc-700 text-xs font-mono">{project.year}</span>
            {project.slug ? (
              <Link
                href={`/projects/${project.slug}`}
                className="text-xs text-cyan-500/60 hover:text-cyan-400 transition-colors"
              >
                查看详情 →
              </Link>
            ) : (
              <span className="text-xs text-zinc-700 italic">Building...</span>
            )}
          </div>
        </div>
      </motion.div>
    </FadeUp>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [copied, setCopied] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [dlState, setDlState] = useState<"idle" | "loading" | "done">("idle");

  function copyEmail() {
    navigator.clipboard.writeText(hero.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (dlState !== "idle") return;
    setDlState("loading");
    setTimeout(() => setDlState("done"), 800);
    setTimeout(() => setDlState("idle"), 2800);
  }

  const dlLabel =
    dlState === "idle" ? "下载简历 ↓" : dlState === "loading" ? "正在下载..." : "已下载 ✓";

  return (
    <section className="max-w-5xl mx-auto px-6 pt-36 md:pt-44 pb-20">
      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {hero.tags.map((t) => (
          <Badge key={t} label={t} />
        ))}
      </motion.div>

      {/* Streaming H1 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.15 }}
      >
        <StreamingH1 />
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 1.3 }}
        className="text-zinc-400 text-base leading-relaxed max-w-xl mb-10"
      >
        {hero.h2}
      </motion.p>

      {/* Contact links */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 1.45 }}
        className="flex flex-wrap gap-2.5 items-center"
      >
        {/* Email */}
        <button
          onClick={copyEmail}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-all duration-200"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="2.5" width="11" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.1" />
            <path d="M1 4l5.5 4L12 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          {copied ? "已复制 ✓" : hero.email}
        </button>

        {/* WeChat */}
        <div className="relative">
          <button
            onClick={() => setWechatOpen((v) => !v)}
            className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-all duration-200"
          >
            微信 ↑
          </button>
          <AnimatePresence>
            {wechatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.16 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-2 glass-card z-20"
              >
                <Image
                  src={hero.wechatQR}
                  alt="WeChat QR Code"
                  width={128}
                  height={128}
                  className="rounded-xl"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* LinkedIn */}
        <a
          href={hero.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-700 text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-all duration-200"
        >
          LinkedIn ↗
        </a>

        {/* Resume — primary gradient CTA */}
        <a
          href={hero.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownload}
          className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)",
            boxShadow: "0 0 20px rgba(6,182,212,0.25)",
          }}
        >
          {dlLabel}
        </a>
      </motion.div>
    </section>
  );
}

// ─── Skills (asymmetric bento + poker flip) ───────────────────────────────────

function SkillsSection() {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <SectionLabel label="Core Skills" />
      <FadeUp>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
          核心技能
        </h2>
      </FadeUp>

      {/* perspective on parent enables true 3D flip */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        style={{ perspective: "1000px" }}
      >
        {skills.map((s, i) => (
          <SkillCard key={s.id} skill={s} index={i} sectionInView={inView} />
        ))}
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <SectionLabel label="Work Experience" />
      <FadeUp>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-12">
          经历与项目
        </h2>
      </FadeUp>

      <div className="relative">
        <div
          className="absolute top-2 bottom-2 hidden md:block"
          style={{
            left: "5px",
            width: "1px",
            background:
              "linear-gradient(to bottom, rgba(6,182,212,0.35), rgba(139,92,246,0.15), transparent)",
          }}
        />
        <div className="flex flex-col gap-4 md:pl-10">
          {experience.map((item, i) => (
            <ExperienceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects (2-col grid, image inside card, 3D hover) ──────────────────────

function ProjectsSection() {
  return (
    <section id="projects" className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <SectionLabel label="Projects" />
      <FadeUp>
        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-10">
          商业落地项目
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

// ─── About teaser ─────────────────────────────────────────────────────────────

function AboutTeaser() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
      <FadeUp>
        <div className="glass-card p-10 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.04] via-transparent to-violet-500/[0.04] pointer-events-none rounded-2xl" />
          <p className="text-zinc-600 text-[11px] tracking-[0.22em] uppercase mb-3">
            About Me
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
            想了解更多关于我的故事？
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-sm mx-auto mb-8">
            从学术研究到创业实战，从 AI 工具链到跨国协作——探索完整经历。
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-zinc-800 border border-zinc-700 text-white text-sm font-medium hover:bg-zinc-700 hover:border-zinc-600 transition-all duration-200"
          >
            了解更多关于我的故事 ↗
          </Link>
        </div>
      </FadeUp>
    </section>
  );
}

// ─── Page root ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "-18%", left: "-10%",
            width: "50vw", height: "50vw",
            background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "50%", right: "-12%",
            width: "44vw", height: "44vw",
            background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <AboutTeaser />
        <footer className="text-center py-8 text-zinc-800 text-xs border-t border-zinc-900">
          © 2025 Cozy Zhu · Built with Next.js & Framer Motion
        </footer>
      </div>
    </div>
  );
}
