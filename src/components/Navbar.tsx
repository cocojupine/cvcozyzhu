"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const navItems = [
  { label: "主页", href: "/" },
  { label: "技能", href: "/#skills" },
  { label: "经历与项目", href: "/#experience" },
  { label: "关于我", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("/#")) return;
    e.preventDefault();
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push(href);
      return;
    }
    const id = href.replace("/#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "glass-navbar" : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-white font-semibold tracking-tight hover:opacity-70 transition-opacity"
        >
          Cozy<span className="gradient-text"> Zhu</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="px-4 py-2 text-sm text-zinc-500 hover:text-zinc-200 rounded-full hover:bg-white/5 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/assets/CV_simplyfy_KesiZhu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 px-5 py-2 text-sm font-medium rounded-full bg-white/[0.07] border border-white/10 text-zinc-200 hover:bg-white/10 transition-all duration-200"
          >
            下载简历 ↓
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-500 hover:text-white transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Scroll progress line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[1px] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(90deg, #06b6d4 0%, #8b5cf6 100%)",
          opacity: 0.6,
        }}
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-navbar overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="py-3 text-sm text-zinc-400 hover:text-white border-b border-white/5 last:border-0 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href="/assets/CV_simplyfy_KesiZhu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-3 py-3 text-center text-sm rounded-full bg-white/[0.07] text-white"
              >
                下载简历 ↓
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
