"use client";

import Image from "next/image";

export type PersonalNoteContent = {
  title: string;
  nowLabel: string;
  now: string;
  interestsLabel: string;
  interests: string;
};

type PaperHeroProps = {
  eyebrow: string;
  facts: string[][];
  issue: string;
  location: string;
  scroll?: string;
  statement: string;
  name: string;
  personalNote: PersonalNoteContent;
};

export default function PaperHero({ eyebrow, facts, issue, location, scroll, statement, name, personalNote }: PaperHeroProps) {
  return (
    <div className="paper-hero relative min-h-[100svh] overflow-hidden bg-[#f2ead9] px-5 pb-12 pt-24 text-[#25190e] md:px-10 md:pb-16 md:pt-28 lg:px-[6vw]">
      <div className="envelope-paper pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute -right-[4vw] top-[4vh] select-none font-black text-[clamp(12rem,35vw,36rem)] leading-none tracking-[-.1em] text-[#805b26]/[.045]">KZ</div>

      <div className="relative mx-auto flex min-h-[calc(100svh-9rem)] max-w-[1500px] flex-col">
        <div className="flex items-center justify-between border-b border-[#2c1a0c]/18 pb-4">
          <span className="envelope-label text-[#805b26]">{issue}</span>
          <span className="envelope-label hidden text-[#78664e] md:block">{location}</span>
        </div>

        <div className="grid flex-1 items-center gap-6 py-9 md:grid-cols-[1.2fr_.8fr] md:gap-10 md:py-12">
          <div>
            <span className="envelope-label inline-block border border-[#956821]/35 bg-[#cba96c]/18 px-3 py-2 text-[#805b26]">{eyebrow}</span>
            <h1 className="mt-6 whitespace-nowrap text-[clamp(4rem,10vw,10rem)] font-black leading-[1.15] tracking-[-.065em]">
              {name}
            </h1>
            <p className="mt-7 max-w-xl text-base font-semibold leading-8 text-[#554634] md:text-lg md:leading-9">{statement}</p>
            <p className="envelope-label mt-7 text-[#8c744f]">PROBLEM → EVIDENCE → DELIVERY</p>
          </div>

          <div className="relative mx-auto w-full max-w-[260px] md:max-w-[390px]">
            <figure className="relative">
              <div className="pointer-events-none absolute inset-x-[12%] bottom-[9%] top-[17%] rounded-full border border-[#805b26]/15" />
              <Image src="/assets/kesi-avatar.png" alt={name} width={835} height={864} priority sizes="(min-width: 768px) 34vw, 260px" className="relative h-auto w-full drop-shadow-[0_18px_16px_rgba(71,43,11,.12)]" />
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
