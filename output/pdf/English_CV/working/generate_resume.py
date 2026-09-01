from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "assets"
OUTPUT = ROOT / "final" / "Kesi_Zhu_CV_EN.pdf"

PURPLE = colors.HexColor("#5B20E5")
DARK = colors.HexColor("#191919")
GRAY = colors.HexColor("#626262")
LIGHT = colors.HexColor("#F1F1F3")
BLUE = colors.HexColor("#0000EE")


def register_fonts():
    font_dir = Path(r"C:\Windows\Fonts")
    pdfmetrics.registerFont(TTFont("SegoeUI", str(font_dir / "segoeui.ttf")))
    pdfmetrics.registerFont(TTFont("SegoeUI-Bold", str(font_dir / "segoeuib.ttf")))
    pdfmetrics.registerFont(TTFont("SegoeUI-Italic", str(font_dir / "segoeuii.ttf")))
    pdfmetrics.registerFont(TTFont("SegoeUI-BoldItalic", str(font_dir / "segoeuiz.ttf")))
    pdfmetrics.registerFontFamily(
        "SegoeUI",
        normal="SegoeUI",
        bold="SegoeUI-Bold",
        italic="SegoeUI-Italic",
        boldItalic="SegoeUI-BoldItalic",
    )
    pdfmetrics.registerFont(TTFont("Montserrat", str(font_dir / "Montserrat-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("Montserrat-Medium", str(font_dir / "Montserrat-Medium.ttf")))
    pdfmetrics.registerFont(TTFont("Arial-Black", str(font_dir / "ariblk.ttf")))


def paragraph_style(name, size, leading, *, color=DARK, font="SegoeUI", align=TA_LEFT,
                    left=0, right=0, first=0, before=0, after=0):
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=align,
        leftIndent=left,
        rightIndent=right,
        firstLineIndent=first,
        spaceBefore=before,
        spaceAfter=after,
        allowWidows=0,
        allowOrphans=0,
    )


BODY = None
BULLET = None
MICROSOFT_BULLET = None
MID_BULLET = None
SMALL = None
RESEARCH_BULLET = None


def prepare_assets():
    portrait = Image.open(ASSETS / "X4.png").convert("RGB")
    portrait = portrait.resize((600, 800), Image.Resampling.LANCZOS)
    portrait.save(ASSETS / "portrait.jpg", quality=88, optimize=True, progressive=True)

    zju = Image.open(ASSETS / "X1.png").convert("RGBA")
    zju = zju.crop(zju.getchannel("A").getbbox())
    zju.thumbnail((220, 220), Image.Resampling.LANCZOS)
    zju.save(ASSETS / "zju_logo.png", optimize=True)

    fuzhou = Image.open(ASSETS / "X2.png").convert("RGBA")
    side = min(fuzhou.height, fuzhou.width)
    fuzhou = fuzhou.crop((0, 0, side, side))
    fuzhou = fuzhou.crop(fuzhou.getchannel("A").getbbox()).resize((220, 220), Image.Resampling.LANCZOS)
    fuzhou.save(ASSETS / "fuzhou_logo.png", optimize=True)

    kth = Image.open(ASSETS / "X3.png").convert("RGBA")
    kth = kth.crop(kth.getchannel("A").getbbox())
    kth.thumbnail((220, 220), Image.Resampling.LANCZOS)
    kth.save(ASSETS / "kth_logo.png", optimize=True)


def draw_para(c, text, x, top, width, style, bullet=None):
    para = Paragraph(text, style, bulletText=bullet)
    _, height = para.wrap(width, A4[1])
    para.drawOn(c, x, top - height)
    return top - height


def draw_bullet_para(c, text, top, style, gap=0.45):
    c.setFillColor(DARK)
    c.circle(36.5, top - 4.2, 1.15, stroke=0, fill=1)
    bottom = draw_para(c, text, 44, top, 514, style)
    return bottom - gap


def draw_pin_icon(c, x, y):
    c.saveState()
    c.setStrokeColor(colors.HexColor("#4A4A4A"))
    c.setLineWidth(0.8)
    c.setLineCap(1)
    c.setLineJoin(1)
    p = c.beginPath()
    p.moveTo(x + 4.8, y)
    p.curveTo(x + 3.8, y + 1.4, x + 1.1, y + 4.5, x + 1.1, y + 7.0)
    p.curveTo(x + 1.1, y + 9.3, x + 2.7, y + 10.7, x + 4.8, y + 10.7)
    p.curveTo(x + 6.9, y + 10.7, x + 8.5, y + 9.3, x + 8.5, y + 7.0)
    p.curveTo(x + 8.5, y + 4.5, x + 5.8, y + 1.4, x + 4.8, y)
    c.drawPath(p, stroke=1, fill=0)
    c.circle(x + 4.8, y + 7.1, 1.35, stroke=1, fill=0)
    c.restoreState()


def draw_phone_icon(c, x, y):
    c.saveState()
    c.setStrokeColor(colors.HexColor("#4A4A4A"))
    c.setLineWidth(0.9)
    c.setLineCap(1)
    c.setLineJoin(1)
    p = c.beginPath()
    p.moveTo(x + 1.7, y + 10.1)
    p.curveTo(x + 0.9, y + 9.8, x + 0.6, y + 8.9, x + 1.0, y + 8.0)
    p.curveTo(x + 2.4, y + 4.6, x + 5.7, y + 1.3, x + 9.1, y + 0.9)
    p.curveTo(x + 10.0, y + 0.8, x + 10.7, y + 1.5, x + 10.5, y + 2.4)
    p.lineTo(x + 10.0, y + 4.0)
    p.curveTo(x + 9.8, y + 4.7, x + 9.1, y + 5.0, x + 8.5, y + 4.7)
    p.lineTo(x + 6.9, y + 3.9)
    p.curveTo(x + 6.3, y + 3.6, x + 5.7, y + 3.8, x + 5.2, y + 4.2)
    p.lineTo(x + 4.2, y + 5.2)
    p.curveTo(x + 3.8, y + 5.7, x + 3.6, y + 6.3, x + 3.9, y + 6.9)
    p.lineTo(x + 4.7, y + 8.5)
    p.curveTo(x + 5.0, y + 9.1, x + 4.7, y + 9.8, x + 4.0, y + 10.0)
    p.close()
    c.drawPath(p, stroke=1, fill=0)
    c.restoreState()


def draw_mail_icon(c, x, y):
    c.saveState()
    c.setStrokeColor(colors.HexColor("#4A4A4A"))
    c.setLineWidth(0.8)
    c.setLineCap(1)
    c.setLineJoin(1)
    c.roundRect(x, y + 1, 10.6, 8.0, 1.35, stroke=1, fill=0)
    c.line(x + 0.9, y + 8.2, x + 5.3, y + 4.8)
    c.line(x + 9.7, y + 8.2, x + 5.3, y + 4.8)
    c.restoreState()


def draw_globe_icon(c, x, y):
    c.saveState()
    c.setStrokeColor(BLUE)
    c.setLineWidth(0.7)
    c.setLineCap(1)
    c.setLineJoin(1)
    c.circle(x + 4.5, y + 4.5, 4.2, stroke=1, fill=0)
    c.ellipse(x + 2.5, y + 0.3, x + 6.5, y + 8.7, stroke=1, fill=0)
    c.line(x + 0.7, y + 4.5, x + 8.3, y + 4.5)
    c.restoreState()


def draw_section(c, title, y):
    c.setFillColor(PURPLE)
    c.roundRect(31, y - 9, 94, 21, 10.5, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Arial-Black", 8.4)
    c.drawCentredString(78, y - 2.5, title)
    c.setStrokeColor(DARK)
    c.setLineWidth(0.65)
    c.line(131, y + 1, 564, y + 1)
    return y - 22


def draw_role(c, y, role, company, dates, bullets, bullet_gap=0.45, after_gap=8.4, style=None):
    c.setFont("SegoeUI-Bold", 8.6)
    c.setFillColor(PURPLE)
    c.drawString(34, y, role)
    c.drawString(141, y, company)
    c.setFont("SegoeUI-Bold", 7.0)
    c.setFillColor(GRAY)
    c.drawRightString(564, y + 0.2, dates)
    y -= 10.8
    role_style = style or BULLET
    for bullet in bullets:
        y = draw_bullet_para(c, bullet, y, role_style, gap=bullet_gap)
    return y - after_gap


def draw_logo(c, path, x, y, width, height):
    c.drawImage(ImageReader(str(path)), x, y, width=width, height=height,
                preserveAspectRatio=True, mask="auto", anchor="c")


def build_resume():
    global BODY, BULLET, MICROSOFT_BULLET, MID_BULLET, SMALL, RESEARCH_BULLET
    register_fonts()
    prepare_assets()
    BODY = paragraph_style("body", 8.5, 10.2)
    BULLET = paragraph_style("bullet", 8.5, 10.2)
    MICROSOFT_BULLET = paragraph_style("microsoft-bullet", 8.5, 10.2)
    MID_BULLET = paragraph_style("mid-bullet", 8.5, 10.2)
    SMALL = paragraph_style("small", 7.0, 8.2, color=GRAY)
    RESEARCH_BULLET = paragraph_style("research-bullet", 8.5, 10.2, color=GRAY)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    width, height = A4
    c.setTitle("Kesi Zhu - AI Product Manager Resume")
    c.setAuthor("Kesi Zhu")
    c.setSubject("English resume translated and updated from the latest Chinese version")

    # Header: portrait and contact details
    draw_logo(c, ASSETS / "portrait.jpg", 45, 710, 72, 96)
    c.setFillColor(DARK)
    c.setFont("Arial-Black", 21.5)
    c.drawString(134, 784, "Kesi Zhu")

    draw_pin_icon(c, 134, 745)
    draw_phone_icon(c, 134, 726)
    draw_mail_icon(c, 134, 709)
    c.setFont("SegoeUI", 8.7)
    c.drawString(150, 748, "Shanghai · Hangzhou · Chengdu")
    c.drawString(150, 731, "+86 135 6800 9560")
    c.drawString(150, 714, "1162135252@qq.com")

    c.setFillColor(BLUE)
    website_label = "cvkesi.site"
    c.setFont("SegoeUI-Bold", 8.2)
    website_width = pdfmetrics.stringWidth(website_label, "SegoeUI-Bold", 8.2)
    website_start = 336.5 - (9 + 5 + website_width) / 2
    draw_globe_icon(c, website_start, 799.5)
    c.drawString(website_start + 14, 801.2, website_label)
    c.linkURL("http://cvkesi.site/", (website_start, 798.5, website_start + 14 + website_width, 810), relative=0)
    qr = Path(__file__).resolve().parents[4] / "cv-website-qr.png"
    draw_logo(c, qr, 307.5, 729.5, 58, 58)
    c.roundRect(279.5, 704, 114, 18.5, 9.25, stroke=1, fill=0)
    c.setFillColor(DARK)
    c.setFont("SegoeUI-Bold", 7.6)
    c.drawCentredString(336.5, 710.3, "# AI Product Portfolio")

    # Honors block
    c.setFillColor(PURPLE)
    c.roundRect(419, 796, 54, 20, 10, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Arial-Black", 8.9)
    c.drawCentredString(446, 802.5, "Honors")
    c.setStrokeColor(DARK)
    c.setLineWidth(0.6)
    c.line(419, 793, 564, 793)
    c.setFillColor(DARK)
    c.setFont("SegoeUI-Bold", 8.0)
    c.drawString(419, 778, "23 awards in hackathons, design")
    c.drawString(419, 767, "and entrepreneurship")
    c.setFillColor(GRAY)
    c.setFont("SegoeUI", 7.1)
    c.drawString(419, 753, "1 utility/design patent · First inventor")
    c.drawString(419, 740, "iF Design Student Award · Top 300")
    c.drawString(419, 727, "A' Design Award & Competition")
    c.drawString(419, 714, "Milan Design Week · China Computing Contest")

    # Education banner
    c.setFillColor(LIGHT)
    c.roundRect(31, 623, 533, 70, 13, stroke=0, fill=1)
    draw_logo(c, ASSETS / "zju_logo.png", 48, 644, 31, 31)
    draw_logo(c, ASSETS / "fuzhou_logo.png", 85, 644, 31, 31)
    draw_logo(c, ASSETS / "kth_logo.png", 121, 644, 31, 31)
    c.setFillColor(PURPLE)
    c.setFont("SegoeUI-Bold", 7.0)
    c.drawCentredString(63.5, 631.5, "M.S.")
    c.drawCentredString(100.5, 631.5, "B.S.")
    c.drawCentredString(136.5, 631.5, "EXCHANGE")

    c.setFillColor(DARK)
    c.setFont("SegoeUI-Bold", 7.4)
    c.drawString(178, 678, "Honors Program for Research & Innovation")
    c.drawString(178, 665, "Zhejiang University")
    c.drawString(178, 652, "Fuzhou University")
    c.drawString(178, 639, "KTH Royal Institute of Technology")
    c.setFont("SegoeUI", 7.2)
    c.drawString(309, 665, "Industrial Design Eng.")
    c.drawString(309, 652, "Industrial Design")
    c.drawString(309, 639, "Exchange Student")
    c.setFont("SegoeUI-Bold", 7.1)
    c.drawString(405, 665, "GPA 3.75 / 4")
    c.drawString(405, 652, "Rank 2 / 61")
    c.setFont("SegoeUI", 7.0)
    c.drawRightString(558, 665, "Jun 2024 - Jun 2027")
    c.drawRightString(558, 652, "Jun 2020 - Jun 2024")

    y = draw_para(
        c,
        "<b>AI / Data:</b> GenAI evaluation, Stable Diffusion, NLP, SQL / Python   "
        "<b>Product / Design:</b> PRD, business analysis, competitive research, MVP, QFD, Figma / Axure",
        41, 615, 523, SMALL,
    ) - 24

    y = draw_section(c, "EXPERIENCE", y)

    y = draw_role(c, y, "Product Manager", "Microsoft · PowerPoint Agent", "May 2026 - Present", [
        "<b>Evaluation workflow:</b> Identified a review bottleneck across 14-case comparison evals with roughly 2,000 characters per analysis. Built an AI-coded analytics MVP in one week; internal tests surfaced <b><font color='#5B20E5'>10 leading low-score causes in 15 minutes</font></b>.",
        "<b>Brand-guide product strategy:</b> Owned a product direction that converts unstructured brand guides into standards a generation system can apply reliably; led discovery, MVP scoping, demo validation, metric design, and product specifications.",
        "<b>Failure diagnosis and iteration:</b> Used case reviews and bug bashes to turn vague feedback such as 'too AI-like' and 'abnormal imagery' into reproducible issues, then translated patterns into priorities for generation quality, latency, routing, and engineering changes.",
        "<b>Test-case architecture:</b> Decomposed stability risks from missing template data, conflicting rules, and content changes into a three-layer test model covering <b><font color='#5B20E5'>12 brand capabilities and 39 element-level cases</font></b>, establishing capability boundaries and a regression baseline.",
    ], bullet_gap=0.9, after_gap=16.0, style=MICROSOFT_BULLET)

    y = draw_role(c, y, "Co-Founder", "Acuispire (HK) & Singularity Leap Tech (Hangzhou)", "May - Aug 2025", [
        "<b>Products:</b> Built 'Otter Home,' a one-minute interior-design and furniture-matching MVP, and 'PiLive,' enabling real-time product recognition and one-click posters for cross-border livestreaming.",
        "<b>0-to-1 delivery:</b> Mapped requirements and workflows with <b><font color='#5B20E5'>27 Shenzhen B2B clients</font></b>; produced PRDs, SKU/SPU commerce schemas, and demos, and coordinated front-end/back-end delivery.",
        "<b>AI engineering system:</b> Defined prompt frameworks, camera standards, and material-rendering requirements; established a style-template library and furniture-category model library.",
        "<b>Commercial and technical trade-offs:</b> Benchmarked 10+ global APIs for output quality, cost, and control; product-logic changes reduced per-feature image cost by approximately <b><font color='#5B20E5'>70%</font></b>.",
        "<b>Partnerships and recognition:</b> Backed by Microsoft startup funding and ByteDance's AI platform; co-authored an HCI paper under review with the PolyU-NVIDIA Joint Lab; won 'Most Investable Project' at Liangcang.",
    ], bullet_gap=0.9, after_gap=16.0)

    y = draw_role(c, y, "Product Manager", "iFLYTEK · B2B AI Healthcare", "Dec 2023 - Feb 2024", [
        "<b>Multi-stakeholder delivery:</b> Integrated with hospital HIS and contributed to CDSS, VTE, and medical-record quality-control projects; adapted UI logic for hospital and provincial-government workflows and coordinated engineering upgrades.",
        "<b>Positioning and launch validation:</b> Benchmarked competitors to define differentiation, feature boundaries, and roadmaps; authored VTE/CDSS manuals, deployed simulated HIS environments, and used Excel/SQL for testing and field processing.",
    ], bullet_gap=0.9, after_gap=16.0, style=MID_BULLET)

    y = draw_role(c, y, "Product Manager", "Hello Inc. · Hardware Products", "Mar - Aug 2024", [
        "<b>User insight and metrics:</b> Synthesized <b><font color='#5B20E5'>400+</font></b> user, operations, and engineering inputs into comparable product metrics; built a Hello/Qingju/Meituan benchmark and linked assembly, CMF, and ergonomic data to seat-angle and firmness improvements for the next-generation Hello Cloud Bike.",
        "<b>Innovation projects and MVP:</b> Supported storage-footrest initiation, user research, and PRD development; validated concepts through MVP A/B tests. Summer initiatives lifted bike turnover by <b><font color='#5B20E5'>2 pp</font></b> and e-bike turnover by <b><font color='#5B20E5'>1.8 pp</font></b>.",
    ], bullet_gap=0.9, after_gap=42.3, style=MID_BULLET)

    y = draw_section(c, "RESEARCH", y + 1.0)

    c.setFillColor(DARK)
    c.setFont("SegoeUI-Bold", 7.2)
    c.drawString(34, y, "3 EI papers & ICDF delegate")
    c.drawString(200, y, "Government Hanfu AI Virtual Try-on")
    c.setFillColor(PURPLE)
    c.drawRightString(558, y, "NTU Artificial Intelligence Programme")
    y -= 12
    c.setFillColor(DARK)
    c.drawString(34, y, "2 national innovation projects")
    c.drawString(200, y, "7+ student leadership roles")
    c.setFillColor(PURPLE)
    c.drawRightString(558, y, "KTH Industrial Production & Mgmt. Exchange")
    y -= 10

    research = [
        "Huddinge Municipality research report; Armada host team; KTH Global Chinese exchange representative; project member, Swedish Chinese Students Association.",
        "Yangtze River Delta Hanfu AI virtual try-on: built three image-generation workflows and optimized two, cutting generation time <b><font color='#5B20E5'>20%</font></b> and reducing poor outputs <b><font color='#5B20E5'>28%</font></b>.",
        "Business valuation and AI bootcamp: applied R, Python, and Heroku to corporate credit scoring and linear regression; completed the program as the sole top-performing team.",
        "Led a smart municipal-waste classification project; introduced a 'carbon account' workstream and used SPSS clustering/stratification to link attitudes with behavior and support a carbon database.",
    ]
    for item in research:
        y = draw_bullet_para(c, item, y, RESEARCH_BULLET, gap=0.35)

    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
