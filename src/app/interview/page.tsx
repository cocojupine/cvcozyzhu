"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  FileText,
  Maximize2,
  Minimize2,
  X,
} from "lucide-react";
import styles from "./page.module.css";

type PanelKey = "microsoft" | "otters" | "pilive" | "experience";

type PanelContent = {
  index: string;
  period: string;
  title: string;
  thesis: string;
  details: Array<{
    label: string;
    title: string;
    body: string;
  }>;
  caseHref?: string;
  resumeHref?: string;
};

const careerPath = [
  {
    id: "01",
    period: "工业设计训练",
    title: "先理解人和场景",
    copy: "从用户、体验与系统关系出发，而不是从功能清单出发。",
  },
  {
    id: "02",
    period: "讯飞 · 哈啰",
    title: "进入复杂业务现场",
    copy: "在医疗 B 端与智能硬件场景中，学习需求定义、量化评价和规模化协作。",
  },
  {
    id: "03",
    period: "两次 AI 创业",
    title: "把想法做成产品",
    copy: "从原型、工作流到商业模式，亲手经历产品从 0 到 1 的完整不确定性。",
  },
  {
    id: "04",
    period: "Microsoft · PowerPoint AI",
    title: "让 AI 结果可以被评估",
    copy: "把生成质量拆解为可测试、可归因、可持续优化的产品问题。",
  },
];

const panels: Record<PanelKey, PanelContent> = {
  microsoft: {
    index: "CASE / 01",
    period: "2026.05—至今",
    title: "Microsoft PowerPoint AI",
    thesis:
      "在企业级 AI PowerPoint 生成场景中，把主观的品牌与内容质量，转化为可测试、可归因的产品问题。",
    details: [
      {
        label: "背景",
        title: "生成出来，不等于可以交付",
        body: "企业级演示文稿不仅要生成内容，还需要满足品牌一致性、内容适配与交付稳定性。质量问题往往跨越模型、素材、模板和产品链路。",
      },
      {
        label: "我的责任",
        title: "品牌能力与质量评测",
        body: "负责测试体系设计、Failure Pattern 归因及产品方案探索，帮助团队从零散问题进入结构化分析。",
      },
      {
        label: "关键判断",
        title: "先建立评价语言，再讨论优化方案",
        body: "面对主观质量问题，先拆解观察维度、失败类型和测试样本，让问题能够被复现、讨论和持续跟踪。",
      },
      {
        label: "阶段价值",
        title: "推动质量问题持续进入产品迭代",
        body: "围绕品牌一致性、内容适配和交付可靠性形成更清晰的问题归因与方案探索路径。",
      },
    ],
  },
  otters: {
    index: "CASE / 02",
    period: "2025.06—2026.03",
    title: "獭獭搭家 · Otter's Home",
    thesis:
      "不把 AI 生图停留在灵感工具，而是连接真实家具资产与装企谈单场景，探索可以落地的 B2B2C 产品闭环。",
    details: [
      {
        label: "背景",
        title: "效果图很好看，但家具买不到",
        body: "通用 AI 生图缺少真实 SKU，传统 3D 渲染又成本高、周期长。装企需要的不是一张图片，而是一套能辅助谈单和交付的工具。",
      },
      {
        label: "我的责任",
        title: "联合创始人、产品负责人、工作流架构",
        body: "负责产品定位、B2B2C 模式、资产数据结构、用户体验原型与生成工作流的搭建和迭代。",
      },
      {
        label: "关键判断",
        title: "从“生成图片”转向“生成可购买方案”",
        body: "用风格模板、家具品类模型和商户资产系统，把前台生成体验与后台真实供应链关联起来。",
      },
      {
        label: "结果",
        title: "1 分钟生成，单功能成本降低 70%",
        body: "通过工作流重构、本地化部署与 API 成本核算，降低生成成本，并将产品带入真实 B 端合作场景。",
      },
    ],
    caseHref: "/projects/otters-home",
  },
  pilive: {
    index: "CASE / 03",
    period: "2025.03—2026.06",
    title: "PiLive · 直播 AI 插件",
    thesis:
      "围绕跨境直播中“用户动心但找不到商品”的转化摩擦，把多模态能力转化为即时交易触发。",
    details: [
      {
        label: "背景",
        title: "直播内容与交易链路脱节",
        body: "主播口播、海报展示和用户找商品之间存在操作延迟，非专业出海团队也缺少低门槛的智能互动工具。",
      },
      {
        label: "我的责任",
        title: "产品经理与 AI Engineering",
        body: "参与产品定位、交互方案、多模态工作流和数据闭环设计，连接 ASR、VLM 与直播间业务动作。",
      },
      {
        label: "关键取舍",
        title: "从独立平台转向轻量插件",
        body: "降低商家接入和迁移成本，把能力嵌入已有直播生态，而不是要求用户更换完整工作平台。",
      },
      {
        label: "阶段结果",
        title: "进入生态验证",
        body: "项目获得湾区最具潜力奖与字节跳动 AI 平台生态支持，验证了轻量化插件方向的外部价值。",
      },
    ],
    caseHref: "/projects/pilive",
  },
  experience: {
    index: "ARCHIVE",
    period: "2023—至今",
    title: "完整经历索引",
    thesis:
      "主线之外的经历保留在这里。当某个业务场景与当前讨论相关时，可以直接进入对应部分。",
    details: [
      {
        label: "Microsoft",
        title: "PowerPoint AI · 产品经理实习生",
        body: "企业级 AI PowerPoint 的品牌能力与质量评测；测试体系、Failure Pattern 归因和产品方案探索。",
      },
      {
        label: "创业经历",
        title: "奇点跃迁 / Acuispire · 联合创始人",
        body: "分别探索 AIGC 家装 SaaS 与跨境直播 AI 插件，覆盖从产品定位、原型和工作流到商业验证的 0→1 过程。",
      },
      {
        label: "iFLYTEK",
        title: "AI 医疗 · 产品经理实习生",
        body: "参与 CDSS、VTE 和病历质控系统，负责省级医院 B 端系统的需求定义与迭代。",
      },
      {
        label: "哈啰出行",
        title: "智能硬件 · 产品经理实习生",
        body: "推动硬件配件创新 MVP，引入 QFD 建立量化评价指标，相关方案拉动翻台率提升约 2%。",
      },
    ],
    resumeHref: "/assets/CV_simplyfy_KesiZhu.pdf",
  },
};

export default function InterviewPage() {
  const [activePanel, setActivePanel] = useState<PanelKey | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePanel(null);
    };

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = activePanel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePanel]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  const panel = activePanel ? panels[activePanel] : null;
  const enter = reduceMotion ? {} : { opacity: 1, y: 0 };
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <main className={styles.page}>
      <div className={styles.ambient} />
      <div className={styles.grid} />

      <div className={styles.shell}>
        <header className={styles.topbar}>
          <div className={styles.brandBlock}>
            <div className={styles.calibrationMark} aria-hidden="true" />
            <div>
              <div className={styles.eyebrow}>Kesi Zhu · Interview View</div>
              <div className={styles.subEyebrow}>Evidence-led product introduction</div>
            </div>
          </div>

          <div className={styles.utility}>
            <span className={styles.utilityLabel}>60—90 sec opening</span>
            <button
              type="button"
              className={styles.iconButton}
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "退出全屏" : "进入全屏"}
              title={isFullscreen ? "退出全屏" : "进入全屏"}
            >
              {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
            </button>
          </div>
        </header>

        <motion.section
          className={styles.hero}
          initial={initial}
          animate={enter}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <div className={styles.metaRow}>
              <span className={styles.metaPill}>AI PRODUCT MANAGER</span>
              <span className={styles.metaPlain}>ZHEJIANG UNIVERSITY · M.DES 2027</span>
            </div>
            <h1 className={styles.heroTitle}>
              把<span className={styles.heroTitleOutline}>不确定</span>的 AI，
              <br />
              做成<span className={styles.heroTitleAccent}>确定的产品</span>。
            </h1>
            <p className={styles.heroSummary}>
              我是朱可思。我关注的不是让 AI 多一个功能，而是让它在真实场景里变得可评估、可交付，并最终值得被用户选择。
            </p>
          </div>

          <aside className={styles.identityCard} aria-label="当前身份">
            <h2 className={styles.identityName}>
              朱可思
              <span>KESI ZHU</span>
            </h2>
            <ul className={styles.identityFacts}>
              <li>微软 PowerPoint AI 产品经理实习生</li>
              <li>两家 AI 创业公司联合创始人</li>
              <li>工业设计、AI 工程与商业化交叉背景</li>
            </ul>
          </aside>
        </motion.section>

        <section className={styles.section} aria-labelledby="career-path-title">
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIndex}>01 / WHY PRODUCT</span>
            <div>
              <h2 id="career-path-title" className={styles.sectionTitle}>
                这不是四段经历，
                <br />
                而是一条逐渐清晰的产品路径。
              </h2>
              <p className={styles.sectionCopy}>
                从关注人的体验，到进入复杂业务现场，再到亲手验证 AI 产品的技术与商业边界。
              </p>
            </div>
          </div>

          <div className={styles.path}>
            {careerPath.map((item, index) => (
              <motion.article
                key={item.id}
                className={styles.pathItem}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={enter}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <div className={styles.pathDot}>{item.id}</div>
                <span className={styles.pathPeriod}>{item.period}</span>
                <h3 className={styles.pathTitle}>{item.title}</h3>
                <p className={styles.pathCopy}>{item.copy}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="evidence-title">
          <div className={styles.sectionHeading}>
            <span className={styles.sectionIndex}>02 / TWO ANCHORS</span>
            <div>
              <h2 id="evidence-title" className={styles.sectionTitle}>
                开场只留下两个证据锚点。
              </h2>
              <p className={styles.sectionCopy}>
                一个关于企业级 AI 的质量问题；一个关于技术能力如何接入真实业务。每个结论都可以继续展开。
              </p>
            </div>
          </div>

          <div className={styles.evidenceGrid}>
            <button
              type="button"
              className={styles.evidenceCard}
              onClick={() => setActivePanel("microsoft")}
              aria-label="展开 Microsoft PowerPoint AI 案例"
            >
              <div>
                <span className={styles.evidenceKicker}>ENTERPRISE AI · QUALITY EVALUATION</span>
                <h3 className={styles.evidenceTitle}>把“生成质量”变成团队可以共同处理的问题。</h3>
              </div>
              <div className={styles.evidenceFooter}>
                <div className={`${styles.metric} ${styles.metricBlue}`}>
                  品牌 × 内容 × 交付
                  <span className={styles.metricLabel}>QUALITY DIMENSIONS</span>
                </div>
                <span className={styles.cardAction}>
                  按需展开 <ArrowUpRight size={16} />
                </span>
              </div>
            </button>

            <button
              type="button"
              className={styles.evidenceCard}
              onClick={() => setActivePanel("otters")}
              aria-label="展开獭獭搭家案例"
            >
              <div>
                <span className={styles.evidenceKicker}>0→1 · AIGC COMMERCIALIZATION</span>
                <h3 className={styles.evidenceTitle}>让生成结果从“能看”走向“能买”。</h3>
              </div>
              <div className={styles.evidenceFooter}>
                <div className={`${styles.metric} ${styles.metricOrange}`}>
                  −70%
                  <span className={styles.metricLabel}>单功能生成成本</span>
                </div>
                <span className={styles.cardAction}>
                  按需展开 <ArrowUpRight size={16} />
                </span>
              </div>
            </button>
          </div>

          <div className={styles.questionRail}>
            <div className={styles.railIntro}>
              <strong>如果想继续，我们从这里深入。</strong>
              <span>项目判断、个人贡献与阶段结果都可以按兴趣展开。</span>
            </div>
            <button type="button" className={styles.railButton} onClick={() => setActivePanel("pilive")}>
              PiLive 产品 Pivot <ChevronRight size={16} />
            </button>
            <button type="button" className={styles.railButton} onClick={() => setActivePanel("experience")}>
              完整经历索引 <ChevronRight size={16} />
            </button>
          </div>
        </section>

        <section className={styles.summaryBand} aria-labelledby="summary-title">
          <span className={styles.sectionIndex}>03 / CLOSE</span>
          <blockquote id="summary-title" className={styles.summaryQuote}>
            我逐渐形成的优势，是在<span>用户问题、技术边界与商业结果</span>之间，找到一个能够真正落地的产品解法。
          </blockquote>
        </section>

        <footer className={styles.footer}>
          <span className={styles.footerNote}>PRODUCT STORY · EVIDENCE ON DEMAND</span>
          <div className={styles.footerLinks}>
            <Link href="/" className={styles.footerLink}>
              个人网站 <ExternalLink size={13} />
            </Link>
            <a href="/assets/CV_simplyfy_KesiZhu.pdf" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>
              简历 <FileText size={13} />
            </a>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {panel && (
          <motion.div
            className={styles.backdrop}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setActivePanel(null);
            }}
          >
            <motion.aside
              className={styles.panel}
              role="dialog"
              aria-modal="true"
              aria-label={panel.title}
              initial={reduceMotion ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className={styles.panelHeader}>
                <div className={styles.panelMeta}>
                  <span className={styles.panelIndex}>{panel.index}</span>
                  <span className={styles.panelPeriod}>{panel.period}</span>
                </div>
                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setActivePanel(null)}
                  aria-label="关闭详情"
                >
                  <X size={18} />
                </button>
              </header>

              <div className={styles.panelBody}>
                <h2 className={styles.panelTitle}>{panel.title}</h2>
                <p className={styles.panelThesis}>{panel.thesis}</p>

                <div className={styles.detailList}>
                  {panel.details.map((detail) => (
                    <section className={styles.detail} key={`${detail.label}-${detail.title}`}>
                      <span className={styles.detailLabel}>{detail.label}</span>
                      <div>
                        <h3 className={styles.detailTitle}>{detail.title}</h3>
                        <p className={styles.detailBody}>{detail.body}</p>
                      </div>
                    </section>
                  ))}
                </div>

                <div className={styles.panelActions}>
                  {panel.caseHref && (
                    <Link href={panel.caseHref} className={styles.primaryAction}>
                      查看完整案例 <ArrowUpRight size={15} />
                    </Link>
                  )}
                  {panel.resumeHref && (
                    <a href={panel.resumeHref} target="_blank" rel="noopener noreferrer" className={styles.primaryAction}>
                      打开完整简历 <FileText size={15} />
                    </a>
                  )}
                  <button type="button" className={styles.secondaryAction} onClick={() => setActivePanel(null)}>
                    返回自我介绍
                  </button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
