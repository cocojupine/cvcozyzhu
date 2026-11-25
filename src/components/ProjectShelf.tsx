import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import styles from "./ProjectShelf.module.css";

type Project = { id: string; name: string; desc: string; image?: string; video?: string; link?: string };
const books: Record<string, [string, string, string, string]> = {
  "01": ["PRODUCT", "AI 营销家居布局", "AI home staging", "book-otters-home.webp"],
  "02": ["SKILL", "AI 需求澄清", "Clarifying intent", "book-grill.webp"],
  "03": ["TOOL", "跨境直播互动", "Live commerce", "book-pilive.webp"],
  "04": ["PRODUCT", "个人知识管理", "Personal knowledge", "book-learning.webp"],
  "05": ["PROTOTYPE", "游戏化番茄钟", "Focus timer", "book-focus.webp"],
};

export default function ProjectShelf({ projects, english }: { projects: Project[]; english: boolean }) {
  const [active, select] = useState<string | null>(null);
  const touch = useRef(false);
  const current = projects.find(project => project.id === active);
  return <div className={styles.shelf} onPointerLeave={e => { if (e.pointerType === "mouse") select(null); }}
    onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) select(null); }}>
    <div className={styles.row}>{projects.map(project => {
      const [kind, cn, en, artwork] = books[project.id];
      const open = active === project.id;
      const title = english ? en : cn;
      const faces = <><span className={styles.spine}>{title}</span><span className={styles.cover}>{project.name}</span></>;
      const props = {
        className: styles.book,
        "aria-label": project.name + " · " + title,
        onFocus: () => { if (!touch.current) select(project.id); },
        onPointerDown: (e: React.PointerEvent) => { touch.current = e.pointerType !== "mouse"; },
        onClick: (e: MouseEvent) => {
          if (touch.current && !open && e.detail > 0) e.preventDefault();
          else if (project.link?.startsWith("/")) sessionStorage.setItem("portfolioSkipIntro", "1");
          select(project.id);
          touch.current = false;
        },
      };
      return <div key={project.id} className={styles.slot} data-open={open}
        style={{ "--art": `url(/assets/${artwork})` } as CSSProperties}
        onPointerEnter={e => { if (e.pointerType === "mouse") select(project.id); }}>
        <span className={styles.label}>{kind}</span>
        {project.link ? <Link {...props} href={project.link} target={project.link.startsWith("https:") ? "_blank" : undefined}>{faces}</Link>
          : <button type="button" {...props}>{faces}</button>}
      </div>;
    })}</div>
    <div className={styles.previewSpace}>{current && <figure className={styles.preview} key={current.id}>
      {current.video ? <video src={current.video} autoPlay muted loop playsInline controls />
        : <img src={current.id === "01" ? "/assets/tatadajia_web.png" : current.image} alt={current.name} />}
      <figcaption><strong>{current.name}</strong><p>{current.desc}</p></figcaption>
    </figure>}</div>
  </div>;
}
