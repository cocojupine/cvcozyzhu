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
OUTPUT = ROOT / "final" / "Kesi_Zhu_CV_Product_Wide.pdf"
PAGE_SIZE = (A4[0], 990)
PAGE_SHIFT = PAGE_SIZE[1] - A4[1]

PURPLE = colors.HexColor("#5B20E5")
PROJECT_RULE_GRAY = colors.HexColor("#B7B7BD")
BODY_SIZE = 8.5
BODY_LEADING = 10.0
DARK = colors.HexColor("#191919")
GRAY = colors.HexColor("#626262")
ICON = colors.HexColor("#4A4A4A")
LIGHT = colors.HexColor("#F1F1F3")
BLUE = colors.HexColor("#0000EE")


def register_fonts():
    font_dir = Path(r"C:\Windows\Fonts")
    pdfmetrics.registerFont(TTFont("Arial", str(font_dir / "arial.ttf")))
    pdfmetrics.registerFont(TTFont("Arial-Bold", str(font_dir / "arialbd.ttf")))
    pdfmetrics.registerFont(TTFont("Arial-Italic", str(font_dir / "ariali.ttf")))
    pdfmetrics.registerFont(TTFont("Arial-BoldItalic", str(font_dir / "arialbi.ttf")))
    pdfmetrics.registerFontFamily(
        "Arial",
        normal="Arial",
        bold="Arial-Bold",
        italic="Arial-Italic",
        boldItalic="Arial-BoldItalic",
    )
    pdfmetrics.registerFont(TTFont("Arial-Black", str(font_dir / "ariblk.ttf")))


def style(name, size, leading, *, color=DARK, font="Arial"):
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


def draw_bullet(c, text, top, paragraph_style, gap=0.25):
    c.setFillColor(DARK)
    c.circle(36.5, top - 4.4, 1.1, stroke=0, fill=1)
    return draw_para(c, text, 44, top, 514, paragraph_style) - gap


def draw_project_bullet(c, text, top, paragraph_style, gap=0.25):
    c.setFillColor(DARK)
    c.circle(40, top - 4.4, 0.85, stroke=0, fill=1)
    return draw_para(c, text, 48, top, 516, paragraph_style) - gap


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
    c.setFont("Arial-Black", 8.5)
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
    c.setFont("Arial-Bold", 8.6)
    c.drawString(34, y, role)
    c.drawString(141, y, company)
    c.setFillColor(GRAY)
    c.setFont("Arial-Bold", 7.0)
    c.drawRightString(564, y + 0.2, dates)
    y -= title_gap
    for bullet in bullets:
        y = draw_bullet(c, bullet, y, paragraph_style)
    return y - after_gap


def draw_role_header(c, y, role, company, dates, title_gap=14.0):
    c.setFillColor(PURPLE)
    c.setFont("Arial-Bold", 8.6)
    c.drawString(34, y, role)
    c.drawString(141, y, company)
    c.setFillColor(GRAY)
    c.setFont("Arial-Bold", 7.0)
    c.drawRightString(564, y + 0.2, dates)
    return y - title_gap


def draw_project(c, y, tag, title, bullets, paragraph_style, after_gap=13.0):
    project_numbers = {
        "Project 1": "01",
        "Project 2": "02",
        "Project 3": "03",
        "Project 4": "04",
        "Venture": "V",
    }
    project_top = y
    c.setFillColor(PURPLE)
    c.setFont("Arial-Bold", 8.5)
    c.drawString(40, y + 0.4, project_numbers.get(tag, tag.upper()))
    c.setFillColor(DARK)
    c.setFont("Arial-Bold", 8.5)
    c.drawString(58, y + 0.1, title)
    # The project heading belongs to the body below it. The much larger
    # after_gap separates this complete project from the next one.
    y -= 4.2
    for bullet in bullets:
        y = draw_project_bullet(c, bullet, y, paragraph_style)
    c.setStrokeColor(PROJECT_RULE_GRAY)
    c.setLineWidth(1.35)
    c.line(34, project_top + 5.2, 34, y + 2.0)
    return y - after_gap


def build_resume():
    register_fonts()
    prepare_assets()
    body = style("body", BODY_SIZE, BODY_LEADING)
    skills = style("skills", BODY_SIZE, BODY_LEADING, color=GRAY)
    research_body = style("research", BODY_SIZE, BODY_LEADING, color=GRAY)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=PAGE_SIZE, pageCompression=1)
    c.setTitle("Kesi Zhu - Project-Grouped AI Product Manager Resume - Hello Version")
    c.setAuthor("Kesi Zhu")
    c.setSubject("Long-form English resume with Hello hardware product experience")
    c.translate(0, PAGE_SHIFT)

    # Header
    draw_image(c, ASSETS / "portrait.jpg", 39, 716, 72, 96)
    c.setFillColor(DARK)
    c.setFont("Arial-Black", 21.5)
    c.drawString(128, 785, "Kesi Zhu")

    draw_phone_icon(c, 128, 731)
    draw_mail_icon(c, 128, 714)
    c.setFont("Arial", 8.7)
    c.drawString(144, 736, "+86 135 6800 9560")
    c.drawString(144, 719, "1162135252@qq.com")

    website_label = "cvkesi.site"
    c.setFillColor(BLUE)
    c.setFont("Arial-Bold", 8.5)
    website_width = pdfmetrics.stringWidth(website_label, "Arial-Bold", 8.5)
    stack_center = 336.5
    website_start = stack_center - (9 + 5 + website_width) / 2
    draw_globe_icon(c, website_start, 789.8)
    c.drawString(website_start + 14, 791.5, website_label)
    c.linkURL("http://cvkesi.site/", (website_start, 788.8, website_start + 14 + website_width, 800.3), relative=1)
    draw_qr(c, "http://cvkesi.site/", stack_center - 28, 733, 56)
    c.setStrokeColor(DARK)
    c.roundRect(stack_center - 57, 711.5, 114, 18.5, 9.25, stroke=1, fill=0)
    c.setFillColor(DARK)
    c.setFont("Arial-Bold", 8.5)
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
    c.setFont("Arial-Bold", 9.2)
    c.drawString(419, 778, "23 awards in hackathons, design")
    c.drawString(419, 768, "and computing competitions")
    c.setFillColor(GRAY)
    c.setFont("Arial", 8.5)
    c.drawString(419, 756, "2 utility/design patents · First inventor")
    c.drawString(419, 745, "China Computing Contest")
    c.drawString(419, 734, "China-US Makers · iF Design · Top 300")
    c.drawString(419, 723, "A' Design Award & Competition")

    # Education
    c.setFillColor(LIGHT)
    c.roundRect(31, 652, 533, 54, 12, stroke=0, fill=1)
    draw_image(c, ASSETS / "zju_logo.png", 48, 670, 31, 31)
    draw_image(c, ASSETS / "fuzhou_logo.png", 85, 670, 31, 31)
    draw_image(c, ASSETS / "kth_logo.png", 121, 670, 31, 31)
    c.setFillColor(PURPLE)
    c.setFont("Arial-Bold", 8.5)
    c.drawCentredString(63.5, 657, "M.S.")
    c.drawCentredString(100.5, 657, "B.S.")
    c.drawCentredString(136.5, 657, "EXCHANGE")

    c.setFillColor(DARK)
    c.setFont("Arial-Bold", 8.5)
    c.drawString(174, 694, "Zhejiang University (Direct Admit)")
    c.drawString(174, 678, "Fuzhou University")
    c.drawString(174, 662, "KTH Royal Institute of Technology")
    c.setFont("Arial", 8.5)
    c.drawString(329, 694, "Industrial Design Eng.")
    c.drawString(329, 678, "Industrial Design")
    c.drawString(329, 662, "Industrial Eng. & Mgmt.")
    c.setFont("Arial-Bold", 8.5)
    c.drawString(430, 694, "GPA 3.75 / 4")
    c.drawString(430, 678, "Rank 2 / 61")
    c.drawString(430, 662, "Research Honors")
    c.setFont("Arial", 7.0)
    c.drawRightString(558, 694, "Jun 2024 - Jun 2027")
    c.drawRightString(558, 678, "Jun 2020 - Jun 2024")

    y = draw_para(
        c,
        "<b>AI / Data:</b> Agent design, GenAI evaluation, AIGC, NLP, SQL / Python&nbsp;&nbsp;&nbsp;"
        "<b>Product / Design:</b> PRD, UI iteration, business analysis, MVP, QFD, Figma / Axure",
        41, 645, 523, skills,
    ) - 22

    y = draw_section(c, "INTERNSHIP EXPERIENCE", y, capsule_width=126)

    y = draw_role_header(c, y, "Product Manager", "Microsoft · PowerPoint Agent", "May - Sep 2026")
    y = draw_project(c, y, "Project 1", "PPT Agent Workflow - Concept to Launch (Owner)", [
        "<b>AI Agent product architecture:</b> Led the enterprise-branded deck workflow, turning unstructured brand files into structured rules and assets; designed brand parsing, rule extraction, Skill orchestration, and the end-to-end PDF-to-PPT pipeline.",
        "<b>Core validation and optimization:</b> Owned PRD/specs, MVP design, and output evaluation; iterated rule-extraction accuracy, constraint execution, and deck quality to reach a <font color='#5B20E5'><b>90% success rate on common test cases</b></font>.",
    ], body)
    y = draw_project(c, y, "Project 2", "Eval Analytics & Decision Product (Owner)", [
        "<b>Eval product build:</b> Independently designed an interactive analysis product and data pipeline that converted <font color='#5B20E5'><b>26K characters of fragmented eval results into a 15-minute review and surfaced 10 primary failure drivers</b></font>.",
        "<b>Business adoption:</b> Embedded the product in internal Agent release reviews and eval-priority calibration, turning static evaluation reports into evidence for quality diagnosis and version decisions.",
    ], body)
    y = draw_project(c, y, "Project 3", "Agent Skill Launch & Quality Tracking", [
        "<b>Skill launch:</b> Drove PPT Skill integration with Concordia; mapped intent, routing, execution, and feedback, and supported acceptance, E2E, and regression testing, <font color='#5B20E5'><b>raising the core-path pass rate to 85%</b></font>.",
        "<b>Generation-quality evaluation:</b> Helped build a framework covering 12 brand capabilities and 39 element-level cases; converted crop, hierarchy, boundary, and exception issues into reproducible failure cases for fixes and regression validation.",
    ], body)
    y = draw_project(c, y, "Project 4", "Copilot Task Recommendation & Product Growth", [
        "<b>Agent product growth:</b> Co-designed a scenario-to-Agent-task recommendation framework; analyzed click, completion, and feedback funnels to improve task supply and the conversion path from capability discovery to execution.",
    ], body, after_gap=26.0)

    y = draw_role_header(c, y, "Co-Founder", "Acuispire (HK) · AI SaaS", "May - Aug 2025")
    y = draw_project(c, y, "Project 1", "Otter Home - AI Interior-Design SaaS (Founding Product Lead)", [
        "<b>Product definition and MVP:</b> Researched 27 Shenzhen home-furnishing companies; owned positioning, PRD, architecture, MVP, and SKU/SPU data design; combined generative design with furniture matching to deliver a full proposal in about one minute.",
        "<b>Merchant validation and iteration:</b> Ran live merchant pilots, gathered business and usage feedback, and refined product-asset upload and generation interactions to fit real workflows.",
        "<b>Pipeline engineering and cost optimization:</b> Benchmarked generation approaches, decomposed model calls, and rebuilt the pipeline around style-by-category rules and material rendering, <font color='#5B20E5'><b>cutting per-feature generation cost by about 70%</b></font>.",
    ], body)
    y = draw_project(c, y, "Project 2", "PiLive - AI Live-Commerce Content SaaS", [
        "<b>AI workflow design:</b> Planned capabilities for pre-live asset creation, in-session scripting and comment assistance, and post-live highlight reuse; defined the core architecture, generation interactions, and demo.",
    ], body)
    y = draw_project(c, y, "Venture", "Venture Development & Partnerships", [
        "<b>Commercialization:</b> Owned product demos, business plans, and the pitch deck; secured <font color='#5B20E5'><b>Microsoft Fund and ByteDance AI platform support</b></font> and initiated HCI research with the PolyU-NVIDIA Joint Lab.",
    ], body, after_gap=26.0)

    y = draw_role(c, y, "Product Manager", "Hello Inc. · Hardware Products", "Mar - Aug 2024", [
        "<b>Innovation projects and MVP validation:</b> Supported night-scanning, storage-footrest, and summer-accessory initiatives; owned requirements analysis, solution definition, PRDs, and demo validation. Small-scale MVP/A/B tests increased vehicle utilization by 2.0 pp for bikes and 1.8 pp for e-bikes.",
        "<b>Product evaluation framework:</b> Synthesized 400+ user, operations, and engineering inputs; used QFD to convert fragmented feedback into comparable durability, operational-efficiency, and anthropometric metrics. Informed refurbishment improvements and quarterly goals, including seat-angle and firmness updates for the next-generation Hello Cloud Bike.",
        "<b>Competitive intelligence and product strategy:</b> Built a Hello/Qingju/Meituan benchmark covering bikes and e-bikes; compared assembly, CMF, ergonomics, and iteration paths, and translated user feedback into hardware selection, feature optimization, and project-investment decisions.",
    ], body, after_gap=26.0)

    y = draw_section(c, "RESEARCH", y, capsule_width=94)
    y = draw_role(c, y, "AI Engineer", "ZJU · Yangtze Delta Smart Oasis Innovation Center", "Sep 2024 - Present", [
        "<b>Hanfu AI virtual try-on:</b> Built three image-generation workflows and optimized two, reducing generation time 20% and internal-test bad cases 28%.",
        "<b>Bull Group user insights:</b> Built a Xiaohongshu/Taobao NLP pipeline; quantified pain points through sentiment analysis and competitive modeling, and delivered a new-product iteration report.",
        "<b>Supor AIGC rice-cooker program:</b> Mapped visual features across price tiers to commercial strategy and generation parameters; used prompt engineering and LoRA for controlled concepts aligned with target-customer conversion goals.",
    ], body, after_gap=18.0, title_gap=7.2)

    c.setStrokeColor(GRAY)
    c.setLineWidth(0.55)
    c.line(34, y + 2, 564, y + 2)
    y -= 8
    c.setFont("Arial-Bold", 8.5)
    c.setFillColor(DARK)
    c.drawString(34, y, "2 national innovation projects")
    c.drawString(168, y, "7 student leadership roles")
    c.drawString(294, y, "3 EI papers & ICDF delegate")
    c.setFillColor(PURPLE)
    c.drawRightString(558, y, "NTU AI & Business Valuation")
    y -= 10

    for item in [
        "<b>NTU AI & Business Valuation:</b> Applied R, Python, and Heroku to credit scoring and linear regression; finished as the sole outstanding team.",
        "<b>Publications:</b> Co-authored three EI-indexed AIGC/HCI papers in first-, second-, and third-author roles, including two CCF-C conference papers presented at HCII and ICDF.",
    ]:
        y = draw_bullet(c, item, y, research_body, gap=0.25)

    c.showPage()
    c.save()
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
