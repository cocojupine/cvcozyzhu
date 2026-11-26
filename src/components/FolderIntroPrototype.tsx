"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./FolderIntro.module.css";
import PaperHero, { introPlaybackRate, type PersonalNoteContent } from "@/components/PaperHero";

type Lang = "CN" | "EN";



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

// Identical cubic segments keep the loose end continuous as each wrap clears a disc.
const wraps = [
  "M1030 532 C1150 529 1350 533 1480 532 C1550 532 1550 640 1480 657 C1330 657 1160 656 1030 656 C945 656 944 534 1030 535 C1180 553 1350 634 1480 650 C1550 655 1550 710 1555 744",
  "M1030 532 C1150 529 1350 533 1480 532 C1550 532 1550 640 1480 657 C1330 657 1160 656 1030 656 C945 656 944 534 1030 535 C1180 553 1390 738 1510 746 C1560 750 1610 702 1625 662",
  "M1030 532 C1150 529 1350 533 1480 532 C1550 532 1550 640 1480 657 C1330 657 1160 656 1030 656 C936 656 890 608 907 551 C929 484 996 468 1085 492 C1160 508 1210 519 1282 496",
  "M1030 532 C1150 529 1350 533 1480 532 C1550 532 1575 581 1582 626 C1591 685 1550 713 1506 718 C1450 724 1408 759 1360 780 C1312 801 1250 791 1210 782 C1160 766 1140 763 1110 771",
  "M1030 532 C1060 542 1114 582 1128 627 C1140 664 1140 696 1134 728 C1128 759 1110 786 1101 805 C1092 827 1095 847 1105 860 C1116 875 1135 880 1145 884 C1156 889 1160 894 1162 900",
];

export default function FolderIntroPrototype(props: FolderIntroProps) {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const [revealing, setRevealing] = useState(false);
  useEffect(() => {
    if (!opening || !visible) return;
    // Start the homepage choreography when the sheet begins to unfold.
    const timer = window.setTimeout(() => setRevealing(true), 1680 / introPlaybackRate);
    return () => window.clearTimeout(timer);
  }, [opening, visible]);
  const closedClip = "inset(50% 15% 50% 85%)";
  const fullClip = "inset(0% 0% 0% 0%)";
  const [pull, setPull] = useState({ start: closedClip, peek: closedClip, distance: 0, pivot: "50% 50%" });
  function openBag(button: HTMLButtonElement) {
    if (opening) return;
    if (reduced) { setVisible(false); return; }
    const bag = button.getBoundingClientRect();
    const edge = ((bag.left + bag.width * .755) / window.innerWidth) * 100;
    const top = ((bag.top + bag.height * .08) / window.innerHeight) * 100;
    const bottom = 100 - ((bag.bottom - bag.height * .08) / window.innerHeight) * 100;
    const distance = Math.min(104, bag.width * .125);
    const travel = distance / window.innerWidth * 100;
    // Offset the mask against the moving page so its left edge stays at the pocket.
    setPull({
      start: `inset(${top}% ${100 - edge}% ${bottom}% ${edge}%)`,
      peek: `inset(${top}% ${100 - edge}% ${bottom}% ${edge - travel}%)`,
      distance, pivot: `${edge}% ${(100 + top - bottom) / 2}%`,
    });
    setOpening(true);
  }
  const cn = props.lang === "CN";
  const openLabel = cn ? "打开个人档案" : "Open personal file";

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("skipIntro") === "1" || sessionStorage.getItem("portfolioSkipIntro") === "1") {
      setVisible(false);
      sessionStorage.removeItem("portfolioSkipIntro");
      url.searchParams.delete("skipIntro");
      window.history.replaceState({}, "", url);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dismiss = (e: KeyboardEvent) => { if (e.key === "Escape") setVisible(false); };
    window.addEventListener("keydown", dismiss);
    return () => {
      document.body.style.overflow = before;
      window.removeEventListener("keydown", dismiss);
    };
  }, [visible]);

  return <section id="top" className="min-h-[100svh]">
    <div className={visible ? styles.desk : undefined} role={visible ? "dialog" : undefined}
      aria-modal={visible || undefined} aria-label={visible ? openLabel : undefined}>
      {visible && <>
        <div className={styles.scene}><div className={styles.bag}>
          <div aria-hidden="true" className={styles.layers}>
          <div className={styles.lining}/>
          <div className={styles.face}/>
          <motion.div className={styles.flap} animate={{rotateY: opening ? 154 : 0}}
            transition={{delay: .76 / introPlaybackRate, duration: .38 / introPlaybackRate, ease: "easeInOut"}}/>
          <svg className={styles.cord} viewBox="0 0 1684 1190" preserveAspectRatio="none" aria-hidden="true">
            <defs><mask id="cord-discs"><rect width="1684" height="1190" fill="white"/><ellipse cx="1030" cy="590" rx="135" ry="134"/><ellipse cx="1480" cy="590" rx="135" ry="134"/></mask></defs>
            <g mask="url(#cord-discs)"><motion.path initial={{d: wraps[0]}} animate={{d: opening ? wraps : wraps[0]}}
              transition={{duration: .78 / introPlaybackRate, times: [0, .31, .51, .71, 1], ease: ["easeIn", "linear", "linear", "easeOut"]}} fill="none" stroke="#f3eee1" strokeWidth="7" strokeLinecap="round"/></g>
          </svg>
          </div>
          <button className={styles.hit} aria-label={openLabel} onClick={(event) => openBag(event.currentTarget)} aria-disabled={opening}/>
          {!opening && <span className={styles.tap} aria-hidden="true">
            <img src="/assets/folder-tap.svg" alt="" />
            <span lang="en">OPEN</span>
          </span>}
        </div></div>
      </>}
      <motion.div className={visible ? styles.page : undefined} inert={visible}
        style={{ transformOrigin: pull.pivot }}
        initial={false}
        animate={visible && opening ? {
          rotate: [0, -1.8, -1.8, 0],
          x: [0, pull.distance, pull.distance, 0],
          clipPath: [pull.start, pull.peek, pull.peek, fullClip],
        } : { x: 0, rotate: 0, clipPath: visible ? closedClip : fullClip }}
        transition={visible && opening ? {
          delay: 1.14 / introPlaybackRate, duration: 1.56 / introPlaybackRate,
          times: [0, .23, .35, 1],
          ease: ["easeInOut", "linear", [.65, 0, .22, 1]],
        } : { duration: 0 }}
        onAnimationComplete={() => { if (opening && visible) setVisible(false); }}>
        <PaperHero {...props} reveal={revealing ? "running" : visible ? "waiting" : "complete"}/>
      </motion.div>
    </div>
  </section>;
}