"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Mic, Zap, Share2, BarChart3 } from "lucide-react";

// ─── Shared Components (Localized for this page) ──────────────────────────────

function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="w-1 h-1 bg-emerald-500 rounded-sm" />
      <span className="text-[10px] font-bold tracking-[0.15em] text-zinc-500 uppercase font-mono">{children}</span>
    </div>
  );
}

// ─── Page Content ─────────────────────────────────────────────────────────────

export default function PiLiveProject() {
  const containerRef = useRef(null);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-black text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-100">
      <GridBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 h-16 bg-gradient-to-b from-black/80 to-transparent pointer-events-none">
        <Link href="/" className="pointer-events-auto group flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all relative z-50">
          <ArrowLeft className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
          <span className="text-[10px] font-bold tracking-widest text-zinc-400 group-hover:text-white transition-colors">返回首页</span>
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative z-10 pt-32 pb-16 px-6 max-w-6xl mx-auto border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-2 py-1 rounded text-xs font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              AI Live Plugin
            </span>
            <span className="px-2 py-1 rounded text-xs font-bold tracking-wider bg-zinc-800 text-zinc-400 border border-white/5 font-mono">
              2025 - 2026
            </span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-none mb-6">
            PILIVE
            <span className="block text-zinc-500 text-3xl md:text-5xl mt-2 font-medium">Live Spark Creator</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed">
            直播 AI 插件。实现“话音落、链接出”的极致交互，让直播间的每一张海报、每一句话都变成下单转化的入口。
          </p>
        </motion.div>
      </header>

      {/* Hero Video */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 -mt-8 mb-16 md:mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative rounded-3xl overflow-hidden bg-transparent border border-white/5 bg-zinc-900/20 backdrop-blur-sm"
        >
          <div className="aspect-video bg-transparent relative flex items-center justify-center p-8">
             <video 
               src="/Pilive_video.mp4" 
               autoPlay 
               loop 
               muted 
               playsInline
               className="w-full h-full object-contain rounded-2xl shadow-2xl"
             />
          </div>
          <div className="py-6 bg-zinc-900/50 border-t border-white/5 flex items-center gap-2 justify-center backdrop-blur-sm">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
             <span className="text-xs font-mono text-emerald-500/80 uppercase tracking-widest">Live Demo • 产品早期介绍视频</span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-0 pb-16 md:pt-0 md:pb-32 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-16 md:gap-32">
        
        {/* Left Column: Sticky Metadata */}
        <aside className="hidden md:block h-fit sticky top-32 space-y-16">
          <div>
            <SectionLabel>担任角色</SectionLabel>
            <ul className="space-y-4 text-base text-zinc-300 font-medium leading-relaxed">
              <li className="text-white font-bold">产品经理</li>
              <li>AI Engineering</li>
            </ul>
          </div>
          
          <div>
            <SectionLabel>核心技术栈</SectionLabel>
            <div className="flex flex-wrap gap-3">
              {['ASR (Whisper)', 'VLM', 'Next.js', 'WebSocket', 'Dify'].map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded bg-zinc-900/50 border border-white/10 text-sm text-zinc-400 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Key Metrics</SectionLabel>
            <div className="space-y-6">
              <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-2xl">
                <div className="text-xl font-mono font-bold text-emerald-400 mb-2">湾区最具潜力奖</div>
              </div>
              <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-2xl">
                <div className="text-xl font-mono font-bold text-white mb-2">字节跳动生态支持</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Narrative Content */}
        <article className="space-y-40">
          
          {/* Context */}
          <section>
            <SectionLabel>01_项目背景</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">消灭“从动心到下单”的3秒损耗</h2>
            <p className="text-zinc-400 text-lg leading-9 mb-12 text-justify">
              中小农户或出海非专业团队在电商直播中，面临的核心挑战已从“内容生产”转向“流量承接”。
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
                <Mic className="w-8 h-8 text-rose-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">高阻力摩擦</h3>
                <p className="text-base text-zinc-400 leading-relaxed">主播口播报号、用户手动寻找的模式存在延迟，导致转化率下跌。</p>
              </div>
              <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
                <Zap className="w-8 h-8 text-amber-400 mb-6" />
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">转化孤岛</h3>
                <p className="text-base text-zinc-400 leading-relaxed">传统海报仅具展示功能，与交易系统脱节，导致流量在跳转中流失。</p>
              </div>
            </div>
          </section>

          {/* Core Solution */}
          <section>
            <SectionLabel>02_核心解决方案</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">多模态确定性交互</h2>
            <p className="text-zinc-400 text-lg leading-9 mb-12 text-justify">
              重塑从“内容引流”到“极简履约”的转化闭环。我主导设计了一套覆盖直播全生命周期的交互方案，将 AI 能力转化为高确定的交易触发点。
            </p>
          </section>

          {/* Impact */}
          <section className="pb-32">
            <SectionLabel>03_商业价值</SectionLabel>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">轻量化插件战略与数据闭环</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
                    <Share2 className="w-8 h-8 text-sky-400 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">从平台到插件的 Pivot</h3>
                    <p className="text-base text-zinc-400 leading-relaxed">转型为生态插件，极大降低商家接入成本，成功切入字节跳动旗下生态。</p>
                </div>
                <div className="p-8 bg-zinc-900/30 border border-white/5 rounded-2xl">
                    <BarChart3 className="w-8 h-8 text-fuchsia-400 mb-6" />
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wider">数据驱动的商业闭环</h3>
                    <p className="text-base text-zinc-400 leading-relaxed">补齐全链路埋点，凭借严谨的转化归因模型，获得微软基金的支持。</p>
                </div>
            </div>
          </section>

        </article>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/5 pt-12">
            <Link href="/" className="group flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">返回首页</span>
            </Link>
            <Link href="/projects/otters-home" className="group flex items-center gap-2 text-right">
              <span className="text-sm font-medium text-zinc-400 group-hover:text-white transition-colors">下一个项目: 獭獭搭家</span>
              <ArrowLeft className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors transform rotate-180" />
            </Link>
        </div>
      </footer>

    </main>
  );
}
