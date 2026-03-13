"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Zap, Layers, Database, BarChart3, CheckCircle2 } from "lucide-react";

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

export default function OttersHomeProject() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  // Parallax effect for the hero image
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

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
      <header className="relative z-10 pt-32 pb-16 px-6 max-w-5xl mx-auto border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-2 py-1 rounded text-xs font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              B2B2C SAAS
            </span>
            <span className="px-2 py-1 rounded text-xs font-bold tracking-wider bg-zinc-800 text-zinc-400 border border-white/5 font-mono">
              2023 - 2024
            </span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-none mb-6">
            OTTER'S HOME
            <span className="block text-zinc-500 text-2xl md:text-4xl mt-2 font-medium">AI 室内设计</span>
          </h1>
          
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed">
            AI 驱动的家装 B2B2C SaaS 平台。打通“灵感生成”到“真实购买”闭环，为 27+ 家工作室提供降本增效的数字化解决方案。
          </p>
        </motion.div>
      </header>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-12 md:gap-24">
        
        {/* Left Column: Sticky Metadata */}
        <aside className="hidden md:block h-fit sticky top-32 space-y-12">
          <div>
            <SectionLabel>担任角色</SectionLabel>
            <ul className="space-y-3 text-sm text-zinc-300 font-medium leading-relaxed">
              <li className="text-white font-bold">联合创始人</li>
              <li>产品负责人</li>
              <li>工作流架构师</li>
            </ul>
          </div>
          
          <div>
            <SectionLabel>核心技术栈</SectionLabel>
            <div className="flex flex-wrap gap-2.5">
              {['Stable Diffusion', 'ComfyUI', 'Next.js', 'Python', 'PostgreSQL'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded bg-zinc-900/50 border border-white/10 text-xs text-zinc-400 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>核心成果</SectionLabel>
            <div className="space-y-5">
              <div className="p-5 bg-zinc-900/30 border border-white/5 rounded-xl">
                <div className="text-2xl font-mono font-bold text-emerald-400 mb-1.5">-70%</div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold">生产成本</div>
              </div>
              <div className="p-5 bg-zinc-900/30 border border-white/5 rounded-xl">
                <div className="text-2xl font-mono font-bold text-white mb-1.5">27+</div>
                <div className="text-[11px] text-zinc-500 uppercase tracking-wider font-bold">B端合作商户</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Narrative Content */}
        <article className="space-y-32">
          
          {/* Overview */}
          <section>
            <SectionLabel>01_项目背景</SectionLabel>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">从灵感到落地的断层</h2>
            <p className="text-zinc-400 text-base leading-8 mb-10 text-justify">
              市面上的 AI 生图工具多为“玩具”，生成的家具无法在现实中购买；而传统的 3D 建模渲染成本极高且周期长。我们需要利用 AIGC 技术，在“高质量渲染”与“真实供应链落地”之间架起桥梁。
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl">
                <Zap className="w-5 h-5 text-amber-400 mb-4" />
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">高昂成本</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">传统 3D 渲染单图成本高，周期长达数天。</p>
              </div>
              <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-xl">
                <Layers className="w-5 h-5 text-rose-400 mb-4" />
                <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wider">虚假资产</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">常规 AI 生成的家具无对应 SKU，无法落地。</p>
              </div>
            </div>
          </section>

          {/* Solution 1: C-End */}
          <section>
            <SectionLabel>02_C端解决方案</SectionLabel>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">1分钟实现“所见即所得”</h2>
            <p className="text-zinc-400 text-base leading-8 mb-10 text-justify">
              打破传统枯燥的选品流程。用户输入需求后，系统快速生成高保真效果图，并精准识别图内风格，自动从数据库中匹配可购买的真实家具链接。
            </p>
            
            <div className="relative rounded-2xl overflow-hidden bg-transparent border border-white/5 bg-zinc-900/20">
              <div className="aspect-[9/16] md:aspect-video bg-transparent relative flex items-center justify-center p-6">
                 <video 
                   src="/assets/tatadajia_phone.webm" 
                   autoPlay 
                   loop 
                   muted 
                   playsInline
                   className="w-full h-full object-contain rounded-xl shadow-2xl"
                 />
              </div>
              <div className="py-4 bg-zinc-900/50 border-t border-white/5 flex items-center gap-2 justify-center backdrop-blur-sm">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                 <span className="text-[10px] font-mono text-emerald-500/80 uppercase tracking-widest">Live Demo • 移动端 C 端界面</span>
              </div>
            </div>
          </section>

          {/* Solution 2: B-End */}
          <section>
            <SectionLabel>03_B端解决方案</SectionLabel>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">SaaS 资产管理系统</h2>
            <p className="text-zinc-400 text-base leading-8 mb-10 text-justify">
              为了支撑前台的精准匹配，我们为 B 端客户（家居厂商）开发了深度的后台管理系统，重构了电商 SKU+SPU 数据结构。
            </p>
            
            <div className="relative rounded-2xl overflow-hidden bg-transparent group border border-white/5 bg-zinc-900/20">
              <div className="aspect-[16/10] relative">
                <Image 
                  src="/assets/tatadajia_web.png"
                  alt="SaaS Dashboard"
                  fill
                  className="object-contain object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="py-4 bg-zinc-900/50 border-t border-white/5 text-center backdrop-blur-sm">
                 <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">商户后台仪表盘</p>
              </div>
            </div>
          </section>

          {/* Impact */}
          <section className="pb-20">
            <SectionLabel>04_商业价值</SectionLabel>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">商业与工程突破</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="flex gap-5 items-start p-6 bg-emerald-900/5 border border-emerald-500/10 rounded-xl hover:border-emerald-500/20 transition-colors">
                <div className="p-2 bg-emerald-500/10 rounded-lg shrink-0 mt-0.5">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">工程成本降低</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed text-justify">
                    深入业务底层，自建生图工作流，建立“风格模板库+家具品类模型”库。通过本地化部署与海内外 API 成本核算，<span className="text-emerald-400 font-bold">成功将单功能生成成本大幅降低 70%</span>。
                  </p>
                </div>
              </div>

              <div className="flex gap-5 items-start p-6 bg-zinc-900/20 border border-white/5 rounded-xl hover:border-white/10 transition-colors">
                <div className="p-2 bg-zinc-800 rounded-lg shrink-0 mt-0.5">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">商业闭环验证</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed text-justify">
                    完成向 B2B2C 模式的战略升级，以极低算力成本打造 SaaS 营销利器，成功验证 AIGC 在装企谈单场景下的商业化变现潜力。
                  </p>
                </div>
              </div>
            </div>
          </section>

        </article>
      </div>

      {/* Footer Nav */}
      <footer className="border-t border-white/5 py-12 relative z-10">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-xs font-bold text-zinc-600 hover:text-white transition-colors tracking-widest uppercase">
            ← 返回首页
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-600 uppercase tracking-widest">下一个项目</span>
            <Link href="/projects/pilive" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors flex items-center gap-2">
              PiLive <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
