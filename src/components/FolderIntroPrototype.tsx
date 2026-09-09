"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import PaperHero, { type PersonalNoteContent } from "@/components/PaperHero";

type Lang = "CN" | "EN";
type IntroMode = "auto" | "pull" | "closeup";
type Phase = "closed" | "unfastening" | "opening" | "open" | "extracting";

type FolderIntroProps = {
  eyebrow: string;
  lang: Lang;
  location: string;
  issue: string;
  scroll: string;
  statement: string;
  name: string;
  personalNote: PersonalNoteContent;
  facts: string[][];
};

const modes: IntroMode[] = ["auto", "pull", "closeup"];

const words = {
  CN: {
    open: "解开，查看档案",
    pull: "抽出档案",
    skip: "跳过开场",
    file: "祝可思 / 个人档案",
    lead: "一份关于好奇、行动与判断的个人档案",
    hint: "点击扣件开启 · 约 2 秒",
    archive: "产品思考与实践记录",
    modes: ["A 自动拆封", "B 手动抽取", "C 扣件特写"],
    state: { closed: "等待拆封", unfastening: "正在解绳", opening: "从左向右翻开", open: "文件夹已打开", extracting: "正在读取档案" },
  },
  EN: {
    open: "Open the archive",
    pull: "Pull out the file",
    skip: "Skip intro",
    file: "Kesi Zhu / PERSONAL FILE",
    lead: "A personal file on curiosity, action, and judgment",
    hint: "Tap the fastener · About 2 seconds",
    archive: "Product thinking and field notes",
    modes: ["A AUTO", "B MANUAL PULL", "C CLOSE-UP"],
    state: { closed: "SEALED", unfastening: "UNFASTENING", opening: "OPENING LEFT TO RIGHT", open: "FOLDER OPEN", extracting: "READING FILE" },
  },
};

export default function FolderIntroPrototype({ eyebrow, lang, location, issue, scroll, statement, name, personalNote, facts }: FolderIntroProps) {
  const reducedMotion = useReducedMotion();
  const timers = useRef<number[]>([]);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>("closed");
  const [mode, setMode] = useState<IntroMode>("auto");
  const [isCompact, setIsCompact] = useState(false);
  const l = words[lang];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const skipRequested = params.get("skipIntro") === "1" || window.sessionStorage.getItem("portfolioSkipIntro") === "1";
    if (skipRequested) {
      window.sessionStorage.removeItem("portfolioSkipIntro");
      setVisible(false);
      if (params.has("skipIntro")) {
        params.delete("skipIntro");
        const query = params.toString();
        window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
      }
    }

    const requested = params.get("intro") as IntroMode | null;
    if (requested && modes.includes(requested)) setMode(requested);

    const media = window.matchMedia("(max-width: 640px)");
    const updateCompact = () => setIsCompact(media.matches);
    updateCompact();
    media.addEventListener("change", updateCompact);
    return () => media.removeEventListener("change", updateCompact);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [visible]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        timers.current.forEach(window.clearTimeout);
        timers.current = [];
        setVisible(false);
        return;
      }
      if (phase !== "closed" || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      const target = event.target as HTMLElement;
      if (target.matches("input, textarea, [contenteditable='true']")) return;
      const current = modes.indexOf(mode);
      const next = event.key === "ArrowRight" ? (current + 1) % modes.length : (current - 1 + modes.length) % modes.length;
      chooseMode(modes[next]);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  const later = (callback: () => void, delay: number) => {
    timers.current.push(window.setTimeout(callback, delay));
  };

  const dismiss = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setVisible(false);
  };

  const chooseMode = (next: IntroMode) => {
    if (phase !== "closed") return;
    setMode(next);
    const url = new URL(window.location.href);
    url.searchParams.set("intro", next);
    window.history.replaceState({}, "", url);
  };

  const finish = () => {
    setPhase("extracting");
    later(() => setVisible(false), isCompact ? 440 : mode === "closeup" ? 620 : 480);
  };

  const start = () => {
    if (phase !== "closed") return;
    if (reducedMotion) {
      setVisible(false);
      return;
    }
    setPhase("unfastening");
    const releaseDuration = isCompact ? 280 : mode === "closeup" ? 560 : 320;
    const openingDuration = isCompact ? 360 : mode === "closeup" ? 540 : 400;
    const openHold = isCompact ? 120 : mode === "closeup" ? 240 : 150;
    later(() => setPhase("opening"), releaseDuration);
    later(() => setPhase("open"), releaseDuration + openingDuration);
    if (mode !== "pull") later(finish, releaseDuration + openingDuration + openHold);
  };

  const hasReleasedCord = phase !== "closed";
  const flapIsOpen = phase === "opening" || phase === "open" || phase === "extracting";
  const extracting = phase === "extracting";

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="envelope-intro fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#c89e58] text-[#2c1a0c]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label={l.file}
          aria-modal="true"
          role="dialog"
        >
          <div className="envelope-paper absolute inset-0 opacity-30" />
          <div className="envelope-grid pointer-events-none absolute inset-0" />

          <motion.div animate={{ opacity: extracting ? 0 : 1 }} className="envelope-topbar absolute inset-x-5 top-5 z-[80] flex items-center justify-between md:inset-x-8 md:top-7">
            <span className="envelope-label flex items-center gap-2 text-[#604019]"><i className="h-1.5 w-1.5 rounded-full bg-[#604019]" /> IDEA ARCHIVE / KZ</span>
            <button type="button" onClick={dismiss} className="envelope-label border-b border-[#604019]/40 pb-1 text-[#604019] hover:border-[#604019] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#604019]">{l.skip}</button>
          </motion.div>

          <motion.div
            className="envelope-arrival relative"
            initial={reducedMotion ? false : {
              x: isCompact ? "-88vw" : "-62vw",
              y: isCompact ? "5vh" : "9vh",
              opacity: 0,
              rotate: isCompact ? -5.5 : -7.5,
              scale: 0.9,
              filter: "blur(3px)",
            }}
            animate={{
              x: [isCompact ? "-88vw" : "-62vw", "3vw", "-0.8vw", 0],
              y: [isCompact ? "5vh" : "9vh", "-1.2vh", "0.35vh", 0],
              opacity: [0, 1, 1, 1],
              rotate: [isCompact ? -5.5 : -7.5, 1.15, -0.28, 0],
              scale: [0.9, 1.012, 0.997, 1],
              filter: ["blur(3px)", "blur(0px)", "blur(0px)", "blur(0px)"],
            }}
            transition={{ duration: isCompact ? 0.78 : 0.88, times: [0, 0.7, 0.88, 1], ease: [0.22, 0.74, 0.24, 1] }}
          >
            {!reducedMotion && (
              <motion.div
                aria-hidden="true"
                className="envelope-arrival-trail"
                initial={{ opacity: 0, scaleX: 0.45 }}
                animate={{ opacity: [0, 0.62, 0], scaleX: [0.45, 1, 0.72] }}
                transition={{ duration: isCompact ? 0.68 : 0.78, times: [0, 0.45, 1], ease: "easeOut" }}
              />
            )}
            <motion.div
              aria-hidden="true"
              className="envelope-arrival-shadow"
              initial={reducedMotion ? false : { opacity: 0, scaleX: 0.62, x: "-8%" }}
              animate={{ opacity: 1, scaleX: 1, x: 0 }}
              transition={{ duration: isCompact ? 0.76 : 0.86, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="envelope-stage relative aspect-[3/2] shadow-[0_38px_100px_rgba(71,43,11,.32)]"
              animate={mode === "closeup" && phase === "closed"
                ? { scale: isCompact ? 1.06 : 1.34, x: isCompact ? "-2%" : "-14%", opacity: 1 }
                : { scale: extracting ? (isCompact ? 0.98 : 0.92) : 1, x: 0, y: extracting ? "2%" : 0, opacity: extracting ? 0 : 1 }}
              transition={{ duration: extracting ? 0.46 : 0.44, ease: [0.22, 1, 0.36, 1] }}
              style={{ perspective: "1700px" }}
            >
            <div className="absolute inset-0 overflow-hidden bg-[#ddb875]">
              <div className="envelope-paper absolute inset-0 opacity-55" />
              <div className="absolute bottom-0 right-0 top-0 w-[25%] border-l border-[#8c662f]/25 bg-[#c89e58]">
                <div className="envelope-paper absolute inset-0 opacity-45" />
                <span className="envelope-label absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-[#785321]/55">OPEN EDGE / PERSONAL FILE</span>
              </div>
            </div>

            <motion.article
              className={`envelope-dossier absolute overflow-hidden border border-[#b29b74] bg-[#f2ead9] p-[clamp(1rem,2.5vw,2.8rem)] shadow-[16px_24px_48px_rgba(71,43,11,.28)] ${extracting ? "z-50" : "z-20"}`}
              initial={false}
              animate={extracting ? { x: "-23%", y: "-8%", rotate: 0, scale: 1.18, opacity: 0 } : { x: 0, y: 0, rotate: 0.8, scale: 1, opacity: flapIsOpen ? 1 : 0.88 }}
              transition={{ duration: extracting ? 0.48 : 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-[#2c1a0c]/18 pb-3">
                <span className="envelope-label text-[#735426]">{l.file}</span>
                <span className="envelope-label text-[#9a7540]">FILE / 2026</span>
              </div>
              <h1 className="mt-[clamp(1rem,3vw,3rem)] text-[clamp(2.1rem,5.5vw,6rem)] font-black leading-[1.1] tracking-[-.065em]">
                {name}
              </h1>
              <p className="mt-[clamp(1rem,2vw,2rem)] max-w-[62%] text-[clamp(.68rem,1.2vw,1.05rem)] font-semibold leading-[1.75] text-[#5d4b34]">{statement}</p>
              <Image src="/assets/kesi-avatar.png" alt={name} width={835} height={864} sizes="28vw" className="absolute bottom-[24%] right-[4%] h-auto w-[30%]" />
              <div className="absolute inset-x-[clamp(1rem,2.5vw,2.8rem)] bottom-[clamp(1rem,2.3vw,2.3rem)] grid grid-cols-4 border-t border-[#2c1a0c]/15 pt-3">
                {facts.map(([number, label]) => <div key={label} className="border-r border-[#2c1a0c]/15 px-2 first:pl-0 last:border-r-0"><strong className="envelope-serif text-[clamp(1.1rem,2.1vw,2.4rem)] italic">{number}</strong><span className="mt-1 block text-[clamp(.4rem,.65vw,.58rem)] font-bold uppercase tracking-[.08em] text-[#775f40]">{label}</span></div>)}
              </div>
            </motion.article>

            <motion.div className="absolute inset-0 z-30" animate={{ opacity: hasReleasedCord ? 1 : 0, x: flapIsOpen ? "-16%" : 0 }} transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}>
              <Image src="/assets/idea-folder-unfastened.png" alt="" fill sizes="(max-width: 640px) 176vw, 94vw" className="object-cover" style={{ clipPath: "inset(0 25% 0 0)" }} />
            </motion.div>

            <motion.div
              className="envelope-flap absolute bottom-0 left-[75%] top-0 z-40 w-[25%]"
              animate={flapIsOpen ? { rotateY: 112, x: "2%", filter: "brightness(.78)" } : { rotateY: 0, x: 0, filter: "brightness(1)" }}
              transition={{ duration: mode === "closeup" ? 0.54 : 0.4, ease: [0.65, 0, 0.2, 1] }}
              style={{ transformOrigin: "right center", transformStyle: "preserve-3d" }}
            />

            <motion.div className="absolute inset-0 z-50" animate={{ opacity: hasReleasedCord ? 0 : 1 }} transition={{ duration: 0.22, delay: hasReleasedCord ? 0.12 : 0 }}>
              <Image src="/assets/idea-folder-start.png" alt="带有灯泡图案和双扣绕绳结构的纸质创意档案袋" fill priority sizes="(max-width: 640px) 176vw, 94vw" className="object-cover" />
            </motion.div>

            <AnimatePresence>
              {phase === "unfastening" && (
                <motion.svg
                  viewBox="0 0 100 100"
                  className="envelope-cord pointer-events-none absolute inset-0 z-[60] h-full w-full overflow-visible"
                  initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 1 }}
                  animate={{
                    opacity: [0, 1, 1, 0.92, 0],
                    x: [0, 0, 0.6, 2.5, 7],
                    y: [0, 0, 3, 18, 44],
                    rotate: [0, 0, 2, 9, 18],
                    scale: [1, 1, 1.02, 0.98, 0.9],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: mode === "closeup" ? 0.56 : 0.3, times: [0, .13, .4, .78, 1], ease: [0.4, 0, 0.2, 1] }}
                  style={{ transformOrigin: "86% 49%" }}
                >
                  <motion.path
                    fill="none"
                    stroke="#f4f1e8"
                    strokeLinecap="round"
                    strokeWidth=".5"
                    d="M61 46 C66 43 72 49 77 46 S84 43 87 47 C89 51 86 54 82 53 C76 51 70 45 64 49 C62 50 61 51 61 52"
                    animate={{ d: [
                      "M61 46 C66 43 72 49 77 46 S84 43 87 47 C89 51 86 54 82 53 C76 51 70 45 64 49 C62 50 61 51 61 52",
                      "M61 49 C66 53 72 60 77 62 S84 61 87 65 C89 69 86 72 82 71 C76 68 70 60 64 57 C62 56 61 55 61 54",
                    ] }}
                    transition={{ duration: mode === "closeup" ? 0.52 : 0.28, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.path
                    fill="none"
                    stroke="#f4f1e8"
                    strokeLinecap="round"
                    strokeWidth=".42"
                    d="M62 51 C67 46 72 52 78 49 C82 47 85 48 88 52"
                    animate={{ d: [
                      "M62 51 C67 46 72 52 78 49 C82 47 85 48 88 52",
                      "M62 53 C67 57 72 64 78 66 C82 67 85 68 88 71",
                    ] }}
                    transition={{ duration: mode === "closeup" ? 0.54 : 0.3, delay: 0.02, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.path
                    fill="none"
                    stroke="#f4f1e8"
                    strokeLinecap="round"
                    strokeWidth=".42"
                    d="M87 48 C90 51 89 55 88 59"
                    animate={{ d: ["M87 48 C90 51 89 55 88 59", "M88 53 C91 59 90 68 89 77"] }}
                    transition={{ duration: mode === "closeup" ? 0.56 : 0.32, delay: 0.03, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>

            {phase === "closed" && (
              <button type="button" onClick={start} className="envelope-trigger absolute left-[86%] top-[51%] z-[70] flex h-[clamp(4.5rem,9vw,8rem)] w-[clamp(4.5rem,9vw,8rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#fff8e6]" aria-label={l.open}>
                <span className="absolute inset-0 rounded-full border border-[#fff8e6]/80" />
                <span className="envelope-label rounded-full bg-[#382111]/88 px-3 py-2 text-center text-[#fff8e6] shadow-lg backdrop-blur-sm">{l.open}<b className="ml-1 font-normal">→</b></span>
              </button>
            )}

            {mode === "pull" && phase === "open" && (
              <motion.button type="button" onClick={finish} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} className="envelope-pull absolute right-[8%] top-1/2 z-[70] -translate-y-1/2 rounded-full bg-[#2c1a0c] px-5 py-3 envelope-label text-[#f4ead4] shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2c1a0c]">{l.pull} →</motion.button>
            )}
            </motion.div>
            <motion.div animate={{ opacity: extracting ? 0 : 1 }} className="envelope-caption absolute -bottom-12 left-0 right-0 flex items-center justify-between text-[#604019]">
              <span className="envelope-label">01 / {l.archive}</span>
              <span className="envelope-label hidden sm:block">{l.hint}</span>
            </motion.div>
          </motion.div>

          {phase !== "closed" && !extracting && <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="envelope-status envelope-label absolute bottom-6 left-1/2 z-[80] -translate-x-1/2 whitespace-nowrap rounded-full border border-[#604019]/20 bg-[#f1d89f]/80 px-4 py-2 text-[#604019] backdrop-blur-sm">{l.state[phase]}</motion.div>}

          <AnimatePresence>
            {extracting && (
              <motion.div
                className="fixed inset-0 z-[75] overflow-hidden bg-[#f2ead9]"
                initial={{ clipPath: "inset(10% 20% 10% 20% round 2px)", opacity: 0.5, scale: 0.92 }}
                animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <PaperHero eyebrow={eyebrow} facts={facts} issue={issue} location={location} scroll={scroll} statement={statement} name={name} personalNote={personalNote} />
              </motion.div>
            )}
          </AnimatePresence>

          {process.env.NODE_ENV !== "production" && (
            <div className="envelope-devbar absolute bottom-5 left-1/2 z-[90] flex -translate-x-1/2 items-center gap-1 rounded-full border border-[#5f421c]/20 bg-[#f1d89f]/88 p-1.5 shadow-lg backdrop-blur-md">
              {modes.map((item, index) => (
                <button key={item} type="button" onClick={() => chooseMode(item)} disabled={phase !== "closed"} className={`rounded-full px-3 py-1.5 envelope-label transition-colors disabled:cursor-not-allowed ${mode === item ? "bg-[#2c1a0c] text-[#f4ead4]" : "text-[#795725] hover:text-[#2c1a0c]"}`}>{l.modes[index]}</button>
              ))}
              <span className="envelope-devstate ml-1 rounded-full border border-[#5f421c]/15 px-3 py-1.5 envelope-label text-[#795725]">STATE / {l.state[phase]}</span>
            </div>
          )}

          <motion.div animate={{ opacity: phase === "closed" ? 1 : 0 }} className="envelope-intro-copy pointer-events-none absolute bottom-6 left-5 z-[79] max-w-xs sm:hidden">
            <p className="envelope-serif text-xl italic leading-tight text-[#4b3012] md:text-2xl">{l.lead}</p>
            <p className="envelope-label mt-3 text-[#704d20] sm:hidden">{l.hint}</p>
          </motion.div>

          <span className="sr-only" aria-live="polite">{l.state[phase]}</span>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
