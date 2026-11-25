"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
    open: "打开简历",
    pull: "抽出档案",
    skip: "跳过开场",
    file: "祝可思 / 个人档案",
    state: { closed: "等待拆封", unfastening: "正在解绳", opening: "从左向右翻开", open: "文件夹已打开", extracting: "正在读取档案" },
  },
  EN: {
    open: "Open résumé",
    pull: "Pull out the file",
    skip: "Skip intro",
    file: "Kesi Zhu / PERSONAL FILE",
    state: { closed: "SEALED", unfastening: "UNFASTENING", opening: "OPENING LEFT TO RIGHT", open: "FOLDER OPEN", extracting: "READING FILE" },
  },
};

export default function FolderIntroPrototype({ eyebrow, lang, location, issue, scroll, statement, name, personalNote, facts }: FolderIntroProps) {
  const reducedMotion = useReducedMotion();
  const film = useRef<HTMLVideoElement>(null);
  const heldForPull = useRef(false);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<Phase>("closed");
  const [mode, setMode] = useState<IntroMode>("auto");
  const [isCompact, setIsCompact] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const [sheetInset, setSheetInset] = useState("inset(50% 50% 50% 50% round 3px)");
  useLayoutEffect(() => {
    const folder = stage.current;
    if (!visible || !folder) return;
    const measure = () => {
      // The right edge starts just inside the mouth at 75% of the folder.
      const widthRatio = folder.clientWidth / document.documentElement.clientWidth;
      const left = 50 - 44 * widthRatio;
      const right = 50 - 21 * widthRatio;
      const top = 50 - 43 * folder.clientHeight / window.innerHeight;
      setSheetInset(`inset(${top}% ${right}% ${top}% ${left}% round 3px)`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(folder);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [visible]);
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

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setPhase("closed"); setVisible(false); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible]);

  const openResume = () => {
    const video = film.current;
    if (!video || reducedMotion || video.error) {
      setVisible(false);
      return;
    }
    setPhase(heldForPull.current ? "opening" : "unfastening");
    video.playbackRate = mode === "closeup" ? 0.85 : 1;
    void video.play().catch(() => setVisible(false));
  };

  const followFilm = () => {
    const video = film.current;
    if (!video || phase === "closed" || phase === "extracting" || video.paused) return;
    if (video.currentTime >= 1.36 && mode === "pull" && !heldForPull.current) {
      video.pause();
      video.currentTime = 1.36;
      heldForPull.current = true;
      setPhase("open");
    } else if (video.currentTime >= 1.42) {
      setPhase("extracting");
    } else if (video.currentTime >= 0.56) {
      setPhase("opening");
    }
  };

  const flapIsOpen = phase === "opening" || phase === "open";
  const extracting = phase === "extracting";

  const pocketOpen = flapIsOpen || extracting;
  const folderPose = {
    x: extracting ? "-118vw" : flapIsOpen ? "-19vw" : "0vw",
    y: phase === "closed" ? 0 : -5,
    scale: mode === "closeup" && !pocketOpen ? (isCompact ? 1.04 : 1.15) : 1,
  };
  const folderTransition = {
    duration: reducedMotion ? 0 : extracting ? 0.72 : 0.56,
    ease: [0.42, 0, 0.2, 1] as const,
  };
  const folderClass = "envelope-stage relative aspect-[1684/1190]";
  return (
    <section id="top" className="min-h-[100svh]">
      <div className={visible ? "envelope-intro fixed inset-0 z-[100] overflow-hidden" : undefined}
        role={visible ? "dialog" : undefined} aria-modal={visible || undefined} aria-label={visible ? l.file : undefined}>
        {visible && <div aria-hidden="true" className="envelope-paper absolute inset-0 opacity-30" />}
        {visible && <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div className={folderClass} initial={false} animate={folderPose} transition={folderTransition}
            style={{ perspective: "1500px" }}>
            <div className="resume-pocket-lining absolute inset-0" />
            <motion.div className="envelope-flap absolute inset-y-0 right-0 w-1/4"
              style={{ transformOrigin: "right center" }}
              initial={false} animate={{ rotateY: pocketOpen ? -150 : 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.4, 0, 0.2, 1] }} />
          </motion.div>
        </div>}
        <motion.div
          onAnimationComplete={() => {
            if (visible && extracting) setVisible(false);
          }}
          inert={visible}
          className={visible ? "absolute inset-0 overflow-hidden bg-[#f2ead9] shadow-2xl" : undefined}
          initial={false}
          animate={{
            clipPath: visible && !extracting ? sheetInset : "inset(0% 0% 0% 0% round 0px)",
            x: visible && flapIsOpen ? "14vw" : "0vw",
            rotate: visible && !extracting ? -4.5 : 0,
          }}
          transition={{ duration: !visible ? 0 : extracting ? 1.05 : flapIsOpen ? 0.48 : 0, ease: [0.76, 0, 0.18, 1] }}
        >
          <PaperHero reveal={extracting ? "running" : visible ? "waiting" : "complete"} eyebrow={eyebrow} facts={facts} issue={issue} location={location} scroll={scroll} statement={statement} name={name} personalNote={personalNote} />
        </motion.div>

        {visible && <>
          <div className="envelope-topbar absolute inset-x-5 top-5 z-[80] flex items-center justify-between text-[#604019] md:inset-x-8 md:top-7">
            <span className="envelope-label">IDEA ARCHIVE / KZ</span>
            <button type="button" onClick={() => { setPhase("closed"); setVisible(false); }} className="envelope-label border-b border-current py-2">{l.skip}</button>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div ref={stage} initial={false}
              className={`${folderClass} pointer-events-auto`}
              animate={folderPose} transition={folderTransition}>
              <div aria-hidden="true" className="resume-pocket-face absolute inset-y-0 left-0 w-3/4" />
              <video ref={film} muted playsInline preload="auto" aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-fill ${pocketOpen ? "invisible" : ""}`}
                poster="/assets/idea-folder-start.webp" src="/assets/folder-reveal.webm"
                onTimeUpdate={followFilm} onEnded={() => setPhase("extracting")}
                onError={() => { if (phase !== "closed") setVisible(false); }} />
              {phase === "closed" && <button type="button" onClick={openResume} aria-label={l.open}
                className="envelope-trigger absolute inset-0 z-10 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4">
                <span className="envelope-tap" aria-hidden="true" />
              </button>}
            </motion.div>
          </div>
          {mode === "pull" && phase === "open" && <button type="button" onClick={openResume}
            className="absolute right-[6%] top-1/2 rounded-full bg-[#392916] px-5 py-3 text-sm text-[#fff8e6]">{l.pull} →</button>}
          <span className="sr-only" aria-live="polite">{l.state[phase]}</span>
        </>}
      </div>
    </section>
  );
}
