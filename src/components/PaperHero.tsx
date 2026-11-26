"use client";

import { useId, useLayoutEffect, useRef } from "react";

export type PersonalNoteContent = {
  title: string;
  nowLabel: string;
  now: string;
  interestsLabel: string;
  interests: string;
};

type PaperHeroProps = {
  reveal?: "waiting" | "running" | "complete";
  eyebrow: string;
  facts: string[][];
  issue: string;
  location: string;
  scroll?: string;
  statement: string;
  name: string;
  personalNote: PersonalNoteContent;
};

export const introPlaybackRate = 0.75;

const confettiColors = ["#ed286b", "#2469cc", "#ffac27", "#e5ef28", "#8039be"];
// Endpoints in the portrait's own coordinate system, relative to the horn tip.
const confettiFlights = [
  [98,-175], [240,-106], [144,-38], [284,24], [105,72], [178,-136],
  [202,85], [74,-91], [264,-46], [128,18], [168,105], [83,-14],
  [225,-164], [154,47], [62,36],
];

export default function PaperHero({ reveal = "complete", eyebrow, facts, issue, location, scroll, statement, name, personalNote }: PaperHeroProps) {
  const root = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "");
  useLayoutEffect(() => {
    if (!root.current || reveal !== "running" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lines = Array.from(root.current.querySelectorAll("[data-resume-line]"));
    const animations = lines.map((line, index) => line.animate(
      [{ transform: "translateY(110%)" }, { transform: "translateY(0)" }],
      { duration: 900 / introPlaybackRate, delay: (620 + 75 * index) / introPlaybackRate, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" }
    ));
    const circles = root.current.querySelectorAll(".resume-ink circle");
    circles.forEach((circle, index) => {
      animations.push(circle.animate([{ r: "0px" }, { r: "1450px" }], {
        duration: 1250 / introPlaybackRate, delay: (520 + [0, 120, 220, 300, 360, 420, 180][index]) / introPlaybackRate,
        easing: "cubic-bezier(.33,1,.68,1)", fill: "backwards",
      }));
    });
    const horn = root.current.querySelector<SVGGElement>("[data-horn]");
    if (!horn) return () => animations.forEach(animation => animation.cancel());
    const earliestBurst = performance.now() + 930 / introPlaybackRate;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      horn.querySelectorAll<SVGGElement>("[data-confetti]").forEach((piece, i) => {
        const [x, y] = confettiFlights[i];
        const pose = (dx: number, dy: number, spin: number, width: number) =>
          `translate(${dx}px, ${dy}px) rotate(${spin}deg) scale(${width}, 1)`;
        const spin = i % 2 ? 120 : -145;
        animations.push(piece.animate([
          { transform: pose(0, 0, 0, .2), opacity: 0, offset: 0 },
          { transform: pose(x*.28, y*.36-6, spin*.22, 1), opacity: 1, offset: .055 },
          { transform: pose(x*.70, y*.89-18, spin*.70, .86), opacity: 1, offset: .23 },
          { transform: pose(x*.88, y-12, spin, .36), opacity: .92, offset: .51 },
          { transform: pose(x, y+42, spin*1.55, .74), opacity: 0, offset: 1 },
        ], {
          delay: Math.max(0, earliestBurst - performance.now()) + (i % 4)*13 / introPlaybackRate,
          duration: (1050 + (i % 5)*95) / introPlaybackRate, fill: "both",
        }));
      });
    });
    observer.observe(horn);
    return () => {
      observer.disconnect();
      animations.forEach(animation => animation.cancel());
    };
  }, [reveal]);
  return (
    <div ref={root} data-resume-reveal={reveal} className="paper-hero relative min-h-[100svh] overflow-hidden bg-[#f2ead9] px-5 pb-12 pt-24 text-[#25190e] md:px-10 md:pb-16 md:pt-28 lg:px-[6vw]">
      <div className="envelope-paper pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute -right-[4vw] top-[4vh] select-none font-black text-[clamp(12rem,35vw,36rem)] leading-none tracking-[-.1em] text-[#805b26]/[.045]">KZ</div>

      <div className="relative mx-auto flex min-h-[calc(100svh-9rem)] max-w-[1500px] flex-col">
        <div className="flex items-center justify-between border-b border-[#2c1a0c]/18 pb-4">
          <span className="envelope-label text-[#805b26]">{issue}</span>
        </div>

        <div className="grid flex-1 items-center gap-6 py-9 md:grid-cols-[1.2fr_.8fr] md:gap-10 md:py-12">
          <div>
            <div className="overflow-hidden"><span data-resume-line className="envelope-label inline-block border border-[#956821]/35 bg-[#cba96c]/18 px-3 py-2 text-[#805b26]">{eyebrow}</span></div>
            <h1 className="mt-6 overflow-hidden whitespace-nowrap text-[clamp(4rem,10vw,10rem)] font-black leading-[1.15] tracking-[-.065em]"><span data-resume-line className="block">{name}</span></h1>
            <p className="mt-3 overflow-hidden text-lg font-bold leading-snug text-[#43301e] md:text-2xl"><span data-resume-line className="block">{location}</span></p>
            <p className="mt-7 max-w-xl overflow-hidden text-base font-semibold leading-8 text-[#554634] md:text-lg md:leading-9"><span data-resume-line className="block">{statement}</span></p>
            <p className="envelope-label mt-7 overflow-hidden text-[#8c744f]"><span data-resume-line className="block">PROBLEM → EVIDENCE → DELIVERY</span></p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] md:max-w-[390px]">
            <figure className="relative">
              <div className="pointer-events-none absolute inset-x-[12%] bottom-[9%] top-[17%] rounded-full border border-[#805b26]/15" />
              <svg viewBox="0 0 835 864" role="img" aria-label={name} className="relative h-auto w-full overflow-visible drop-shadow-[0_18px_16px_rgba(71,43,11,.12)]">
                <defs>
                  <filter id={id + "-grain"} filterUnits="userSpaceOnUse" x="-64" y="-64" width="963" height="992">
                    <feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" seed="7" />
                    <feDisplacementMap in="SourceGraphic" scale="120" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                  <mask id={id + "-ink"} maskUnits="userSpaceOnUse" x="0" y="0" width="835" height="864">
                    <g className="resume-ink" fill="white" filter={`url(#${id}-grain)`}>
                      {[[265,317],[600,576],[440,115],[159,730],[705,240],[458,825],[405,451]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="1450" />)}
                    </g>
                  </mask>
                </defs>
                <image href="/assets/kesi-avatar.png" width="835" height="864" mask={reveal === "complete" ? undefined : `url(#${id}-ink)`} />
                <g transform="translate(749 496) scale(1.25)" data-horn="" aria-hidden="true" pointerEvents="none">
                  <rect width="2" height="2" fill="transparent" />
                  {confettiFlights.map((_, i) => (
                    <g key={i} data-confetti="" opacity="0" fill={confettiColors[i % confettiColors.length]}>
                      {i % 5 === 0
                        ? <path d="M-12 -3 Q-5 -12 2 -4 T16 -7 L17 -2 Q9 8 0 0 T-10 3Z" />
                        : <rect x="-7" y="-8" width={i % 3 ? 15 : 9} height={i % 3 ? 16 : 24} rx="2" />}
                    </g>
                  ))}
                </g>
              </svg>
              <figcaption className="envelope-label mt-2 flex items-center justify-between border-t border-[#2c1a0c]/18 pt-3 text-[#805b26]"><span>PERSONAL FILE</span><span>KZ / 2026</span></figcaption>
            </figure>
            <aside aria-label={personalNote.title} className="relative ml-auto mt-6 w-[256px] max-w-full rotate-[2deg] border border-[#67725e]/15 bg-[#e0ead8] px-4 py-4 text-[#394435] shadow-[2px_4px_0_rgba(75,67,41,.05),0_8px_18px_rgba(75,67,41,.1)]">
              <span aria-hidden="true" className="pointer-events-none absolute -top-2 left-1/2 h-4 w-14 -translate-x-1/2 -rotate-[5deg] border-x border-[#e9d6af]/40 bg-[#e9d6af]/70" />
              <dl className="space-y-2 text-[13px] leading-6">
                <div><dt className="inline text-[#68735f]">{personalNote.nowLabel}</dt><dd className="inline font-semibold">{personalNote.now}</dd></div>
                <div><dt className="inline text-[#68735f]">{personalNote.interestsLabel}</dt><dd className="inline">{personalNote.interests}</dd></div>
              </dl>
            </aside>
          </div>
        </div>

        <div className="grid grid-cols-2 border-y border-[#2c1a0c]/18 lg:grid-cols-4">
          {facts.map(([number, label]) => (
            <div key={label} className="flex flex-col items-start gap-2 border-b border-r border-[#2c1a0c]/12 px-4 py-4 last:border-r-0 [&:nth-last-child(-n+2)]:border-b-0 lg:flex-row lg:items-baseline lg:gap-3 lg:border-b-0">
              <span className="envelope-serif shrink-0 text-3xl italic text-[#372515]">{number}</span>
              <span className="text-[10px] font-bold uppercase leading-5 tracking-[.12em] text-[#806e56]">{label}</span>
            </div>
          ))}
        </div>

        {scroll && <a href="#experience" className="envelope-label mt-5 flex w-fit items-center gap-3 text-[#806e56] transition-colors hover:text-[#25190e]">{scroll}<span aria-hidden="true">↓</span></a>}
      </div>
    </div>
  );
}
