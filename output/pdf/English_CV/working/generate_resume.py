from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "assets"
OUTPUT = ROOT / "final" / "Kesi_Zhu_CV_EN.pdf"

PURPLE = colors.HexColor("#5B20E5")
DARK = colors.HexColor("#191919")
GRAY = colors.HexColor("#626262")
ICON = colors.HexColor("#4A4A4A")
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
    pdfmetrics.registerFont(TTFont("Arial-Black", str(font_dir / "ariblk.ttf")))


def style(name, size, leading, *, color=DARK, font="SegoeUI"):
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        allowWidows=0,
        allowOrphans=0,
    )


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
    fuzhou = fuzhou.crop(fuzhou.getchannel("A").getbbox())
    fuzhou = fuzhou.resize((220, 220), Image.Resampling.LANCZOS)
    fuzhou.save(ASSETS / "fuzhou_logo.png", optimize=True)

    kth = Image.open(ASSETS / "X3.png").convert("RGBA")
    kth = kth.crop(kth.getchannel("A").getbbox())
    kth.thumbnail((220, 220), Image.Resampling.LANCZOS)
    kth.save(ASSETS / "kth_logo.png", optimize=True)


def draw_image(c, path, x, y, width, height):
    c.drawImage(
        ImageReader(str(path)), x, y, width=width, height=height,
        preserveAspectRatio=True, mask="auto", anchor="c"
    )


def draw_qr(c, value, x, y, size):
    widget = qr.QrCodeWidget(value)
    x0, y0, x1, y1 = widget.getBounds()
    width = x1 - x0
    height = y1 - y0
    drawing = Drawing(size, size, transform=[size / width, 0, 0, size / height, 0, 0])
    drawing.add(widget)
    renderPDF.draw(drawing, c, x, y)


def draw_para(c, text, x, top, width, paragraph_style):
    para = Paragraph(text, paragraph_style)
    _, height = para.wrap(width, A4[1])
    para.drawOn(c, x, top - height)
    return top - height


def draw_bullet(c, text, top, paragraph_style, gap=0.6):
    c.setFillColor(DARK)
    c.circle(36.5, top - 4.4, 1.1, stroke=0, fill=1)
    return draw_para(c, text, 44, top, 514, paragraph_style) - gap


def draw_pin_icon(c, x, y):
    c.saveState()
    c.setStrokeColor(ICON)
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
    c.setStrokeColor(ICON)
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
    c.setStrokeColor(ICON)
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
    c.circle(x + 4.5, y + 4.5, 4.2, stroke=1, fill=0)
    c.ellipse(x + 2.5, y + 0.3, x + 6.5, y + 8.7, stroke=1, fill=0)
    c.line(x + 0.7, y + 4.5, x + 8.3, y + 4.5)
    c.restoreState()


def draw_section(c, title, y, capsule_width=94):
    c.setFillColor(PURPLE)
    c.roundRect(31, y - 9, capsule_width, 21, 10.5, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Arial-Black", 8.2 if capsule_width > 100 else 8.5)
    c.drawCentredString(31 + capsule_width / 2, y - 2.5, title)
    c.setStrokeColor(DARK)
    c.setLineWidth(0.65)
    c.line(37 + capsule_width, y + 1, 564, y + 1)
    return y - 22


def draw_role(
    c, y, role, company, dates, bullets, paragraph_style,
    after_gap=10.0, title_gap=7.2,
):
    c.setFillColor(PURPLE)
    c.setFont("SegoeUI-Bold", 8.6)
    c.drawString(34, y, role)
    c.drawString(141, y, company)
    c.setFillColor(GRAY)
    c.setFont("SegoeUI-Bold", 7.0)
    c.drawRightString(564, y + 0.2, dates)
    y -= title_gap
    for bullet in bullets:
        y = draw_bullet(c, bullet, y, paragraph_style)
    return y - after_gap


def build_resume():
    register_fonts()
    prepare_assets()
    body = style("body", 8.5, 10.2)
    skills = style("skills", 7.0, 8.2, color=GRAY)
    research_body = style("research", 8.5, 10.2, color=GRAY)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("Kesi Zhu - AI Product Manager Resume")
    c.setAuthor("Kesi Zhu")
    c.setSubject("English resume translated from the latest Chinese version")

    # Header
    draw_image(c, ASSETS / "portrait.jpg", 39, 716, 72, 96)
    c.setFillColor(DARK)
    c.setFont("Arial-Black", 21.5)
    c.drawString(128, 785, "Kesi Zhu")

    draw_phone_icon(c, 128, 731)
    draw_mail_icon(c, 128, 714)
    c.setFont("SegoeUI", 8.7)
    c.drawString(144, 736, "+86 135 6800 9560")
    c.drawString(144, 719, "1162135252@qq.com")

    website_label = "cvkesi.site"
    c.setFillColor(BLUE)
    c.setFont("SegoeUI-Bold", 8.2)
    website_width = pdfmetrics.stringWidth(website_label, "SegoeUI-Bold", 8.2)
    stack_center = 336.5
    website_start = stack_center - (9 + 5 + website_width) / 2
    draw_globe_icon(c, website_start, 789.8)
    c.drawString(website_start + 14, 791.5, website_label)
    c.linkURL("http://cvkesi.site/", (website_start, 788.8, website_start + 14 + website_width, 800.3), relative=0)
    draw_qr(c, "http://cvkesi.site/", stack_center - 28, 733, 56)
    c.setStrokeColor(DARK)
    c.roundRect(stack_center - 57, 711.5, 114, 18.5, 9.25, stroke=1, fill=0)
    c.setFillColor(DARK)
    c.setFont("SegoeUI-Bold", 7.6)
    c.drawCentredString(stack_center, 717.8, "# AI Product Portfolio")

    # Honors
    c.setFillColor(PURPLE)
    c.roundRect(419, 796, 54, 20, 10, stroke=0, fill=1)
    c.setFillColor(colors.white)
    c.setFont("Arial-Black", 8.9)
    c.drawCentredString(446, 802.5, "Honors")
    c.setStrokeColor(DARK)
    c.line(419, 793, 564, 793)
    c.setFillColor(DARK)
    c.setFont("SegoeUI-Bold", 9.2)
    c.drawString(419, 778, "23 awards in hackathons, design")
    c.drawString(419, 767, "and entrepreneurship")
    c.setFillColor(GRAY)
    c.setFont("SegoeUI", 7.6)
    c.drawString(419, 753, "2 utility/design patents · First inventor")
    c.drawString(419, 740, "China Computing Contest · China-US Makers")
    c.drawString(419, 727, "iF Design · Top 300")
    c.drawString(419, 714, "A' Design Award & Competition")

    # Education
    c.setFillColor(LIGHT)
    c.roundRect(31, 640, 533, 60, 13, stroke=0, fill=1)
    draw_image(c, ASSETS / "zju_logo.png", 48, 658, 31, 31)
    draw_image(c, ASSETS / "fuzhou_logo.png", 85, 658, 31, 31)
    draw_image(c, ASSETS / "kth_logo.png", 121, 658, 31, 31)
    c.setFillColor(PURPLE)
    c.setFont("SegoeUI-Bold", 7.0)
    c.drawCentredString(63.5, 645, "M.S.")
    c.drawCentredString(100.5, 645, "B.S.")
    c.drawCentredString(136.5, 645, "EXCHANGE")

    c.setFillColor(DARK)
    c.setFont("SegoeUI-Bold", 8.0)
    c.drawString(174, 682, "Zhejiang University (Direct Admit)")
    c.drawString(174, 666, "Fuzhou University")
    c.drawString(174, 650, "KTH Royal Institute of Technology")
    c.setFont("SegoeUI", 8.5)
    c.drawString(329, 682, "Industrial Design Eng.")
    c.drawString(329, 666, "Industrial Design")
    c.drawString(329, 650, "Exchange Student")
    c.setFont("SegoeUI-Bold", 8.5)
    c.drawString(430, 682, "GPA 3.75 / 4")
    c.drawString(430, 666, "Rank 2 / 61")
    c.drawString(430, 650, "Research Honors")
    c.setFont("SegoeUI", 7.0)
    c.drawRightString(558, 682, "Jun 2024 - Jun 2027")
    c.drawRightString(558, 666, "Jun 2020 - Jun 2024")

    y = draw_para(
        c,
        "<b>AI / Data:</b> Agent design, GenAI evaluation, AIGC, NLP, SQL / Python&nbsp;&nbsp;&nbsp;"
        "<b>Product / Design:</b> PRD, UI iteration, business analysis, MVP, QFD, Figma / Axure",
        41, 633, 523, skills,
    ) - 22

    y = draw_section(c, "INTERNSHIP EXPERIENCE", y, capsule_width=126)

    y = draw_role(c, y, "Product Manager", "Microsoft · PowerPoint Agent", "May - Sep 2026", [
        "<b>Scope:</b> Improved platform and evaluation workflows, then focused on Agent-based PPT generation, Skill launches, and task recommendation and adoption.",
        "<b>End-to-end structuring and generation:</b> Owned the PDF-to-PPT product concept, converting unstructured brand assets into callable rules and designing the Skill pipeline. Led discovery, PRD/specs, MVP/demo validation, and engineering review across rule extraction, generation, and the end-to-end flow.",
        "<b>Evaluation decision-efficiency demo:</b> Built an analysis MVP that grouped low-score issues and linked supporting evidence, compressing a <font color='#5B20E5'><b>26K-character review into about 15 minutes and identifying 10 leading root causes</b></font>.",
        "<b>Generation-quality evaluation:</b> Co-developed boundary and functional tests spanning <font color='#5B20E5'><b>12 brand capabilities and 39 element-level cases</b></font>; converted crop and hierarchy defects into reproducible, traceable quality issues and a regression baseline.",
        "<b>Agent Skill launch and E2E validation:</b> Co-led PPT Skill validation across intent recognition, routing, execution, and feedback. Classified bad cases across routing, execution, and interaction, drove fixes, and brought the core journey to <font color='#5B20E5'><b>about 85% usability for internal release</b></font>.",
        "<b>Agent task-recommendation growth:</b> Co-built Copilot's scenario-to-Agent-task framework and task-supply strategy; used clicks, completion, and user feedback to optimize how scenarios and recommendation patterns affected Agent adoption.",
    ], body, after_gap=12.0)

    y = draw_role(c, y, "Co-Founder", "Acuispire (HK) & Singularity Leap Tech (Hangzhou)", "May - Aug 2025", [
        "<b>Products:</b> Led 0-to-1 design and MVP delivery for AI SaaS. 'Otter Home' generated interior schemes and furniture matching in one minute; 'PiLive' supported pre-live assets, real-time scripts/comments, and post-live highlight reuse for agricultural commerce.",
        "<b>0-to-1 definition and MVP:</b> Researched 27 Shenzhen B2B home-furnishing companies; mapped workflows and user journeys; owned product architecture, core UI and demos, designed SKU/SPU data structures, and coordinated front-/back-end delivery.",
        "<b>AI engineering system:</b> Converted prompts, material rendering, and generation parameters into product rules by scenario, establishing a style and furniture-category model library.",
        "<b>Technology selection and cost optimization:</b> Evaluated 10+ global image-generation APIs across quality, latency, stability, control, and cost; optimized routing and product flow to <font color='#5B20E5'><b>cut per-feature generation cost by about 70%</b></font>.",
        "<b>User validation and recognition:</b> Owned demos, business plans, and the funding deck. <font color='#5B20E5'><b>Won Microsoft Fund backing and Liangcang's 'Most Investable Project'</b></font>, received ByteDance AI platform support, and conducted HCI research with the PolyU-NVIDIA Joint Lab.",
    ], body, after_gap=12.0, title_gap=7.2)

    y = draw_role(c, y, "Product Manager", "Hello Inc. · Hardware Products", "Mar - Aug 2024", [
        "<b>Evaluation framework:</b> Synthesized 400+ user, operations, and engineering inputs into comparable durability, service-efficiency, and ergonomic metrics through QFD; informed refurbishment goals and seat-angle/firmness improvements for the next-generation Hello Cloud Bike.",
        "<b>Competitive analysis and product strategy:</b> Built a Hello/Qingju/Meituan bike and e-bike benchmark across assembly, CMF, ergonomics, and iteration paths; translated user feedback into hardware selection, feature, and project decisions.",
        "<b>Innovation projects and MVP validation:</b> Supported night scanning, storage-footrest, and summer-accessory initiatives from requirements through PRD/demo validation. Small-scale MVP/A/B tests lifted bike turnover by 2 pp and e-bike turnover by 1.8 pp.",
    ], body, after_gap=22.0)

    y = draw_section(c, "RESEARCH", y, capsule_width=94)
    c.setFont("SegoeUI-Bold", 7.2)
    c.setFillColor(DARK)
    c.drawString(34, y, "2 national innovation projects")
    c.drawString(205, y, "3 AI hackathon awards")
    c.setFillColor(PURPLE)
    c.drawRightString(558, y, "NTU Artificial Intelligence Programme")
    y -= 12
    c.setFillColor(DARK)
    c.drawString(34, y, "KTH exchange student")
    c.drawString(205, y, "3 industry projects · AI engineer")
    c.setFillColor(PURPLE)
    c.drawRightString(558, y, "3 EI papers & ICDF delegate")
    y -= 10

    for item in [
        "Huddinge Municipality research report; Armada host team; KTH Global Chinese exchange representative; project member, Swedish Chinese Students Association.",
        "Yangtze River Delta Hanfu AI virtual try-on: built three image-generation workflows and optimized two, cutting generation time 20% and improving output quality 28%.",
        "Bull Group user-data project: built a Xiaohongshu/Taobao NLP pipeline; quantified pain points through sentiment analysis and competitive modeling, and produced a product-iteration report.",
        "NTU business valuation and AI bootcamp: applied R, Python, and Heroku to credit scoring and linear regression; finished as the sole top-performing team.",
    ]:
        y = draw_bullet(c, item, y, research_body, gap=0.5)

    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
