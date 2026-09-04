"use client";

type PaperHeroProps = {
  eyebrow: string;
  facts: string[][];
  issue: string;
  location: string;
  scroll?: string;
  statement: string;
  thesis: string[];
};

export default function PaperHero({ eyebrow, facts, issue, location, scroll, statement, thesis }: PaperHeroProps) {
  return (
    <div className="paper-hero relative min-h-[100svh] overflow-hidden bg-[#f2ead9] px-5 pb-12 pt-24 text-[#25190e] md:px-10 md:pb-16 md:pt-28 lg:px-[6vw]">
      <div className="envelope-paper pointer-events-none absolute inset-0 opacity-25" />
      <div className="pointer-events-none absolute -right-[4vw] top-[4vh] select-none font-black text-[clamp(12rem,35vw,36rem)] leading-none tracking-[-.1em] text-[#805b26]/[.045]">KZ</div>

      <div className="relative mx-auto flex min-h-[calc(100svh-9rem)] max-w-[1500px] flex-col">
        <div className="flex items-center justify-between border-b border-[#2c1a0c]/18 pb-4">
          <span className="envelope-label text-[#805b26]">{issue}</span>
          <span className="envelope-label hidden text-[#78664e] md:block">{location}</span>
        </div>

        <div id="thesis" className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.35fr_.65fr] lg:gap-16">
          <div>
            <span className="envelope-label inline-block border border-[#956821]/35 bg-[#cba96c]/18 px-3 py-2 text-[#805b26]">{eyebrow}</span>
            <h1 className="mt-7 max-w-[980px] text-[clamp(4rem,9.3vw,9.8rem)] font-black leading-[.82] tracking-[-.072em]">
              {thesis.map((line, index) => <span key={line} className={`block ${index === 1 ? "envelope-serif font-normal italic text-[#956821]" : ""}`}>{line}</span>)}
            </h1>
          </div>

          <aside className="relative border-l border-[#2c1a0c]/18 pl-6 md:pl-8">
            <div className="mb-8 flex items-center gap-5">
              <div className="paper-hero-seal flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#805b26]/35 text-[#805b26] md:h-32 md:w-32">
                <span className="envelope-serif text-4xl italic md:text-5xl">KZ</span>
              </div>
              <div>
                <span className="envelope-label text-[#805b26]">PERSONAL FILE</span>
                <p className="mt-2 text-xs leading-6 text-[#78664e]">AI PRODUCT / 0→1 / EVALUATION</p>
              </div>
            </div>
            <p className="max-w-xl text-base font-semibold leading-8 text-[#554634] md:text-lg md:leading-9">{statement}</p>
            <div className="mt-8 h-px bg-[#2c1a0c]/16" />
            <p className="envelope-label mt-4 text-[#8c744f]">PROBLEM → EVIDENCE → DELIVERY</p>
          </aside>
        </div>

        <div className="grid border-y border-[#2c1a0c]/18 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([number, label]) => (
            <div key={label} className="border-b border-r border-[#2c1a0c]/12 px-4 py-4 last:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:border-b-0">
              <span className="envelope-serif text-3xl italic text-[#372515]">{number}</span>
              <span className="ml-3 text-[10px] font-bold uppercase tracking-[.12em] text-[#806e56]">{label}</span>
            </div>
          ))}
        </div>

        {scroll && <a href="#experience" className="envelope-label mt-5 flex w-fit items-center gap-3 text-[#806e56] transition-colors hover:text-[#25190e]">{scroll}<span aria-hidden="true">↓</span></a>}
      </div>
    </div>
  );
}
