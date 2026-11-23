"""Combines the numbered docs (01-, 02-, … 10-) into one branded HTML file that Word turns into .docx and .pdf.

Run:  python src/compile-docs.py   (needs the "markdown" package: pip install markdown)
Then: src/compile-docs.ps1          (Edge prints the .pdf, Word saves the .docx)
"""
import base64
import pathlib
import re
import markdown

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
# Embedded as a data URI so the .docx and .pdf carry the logo with no link to a local file.
LOGO = "data:image/png;base64," + base64.b64encode((ROOT / "brand" / "letterhead" / "logo-horizontal.png").read_bytes()).decode()
FILES = sorted(DOCS.glob("[0-9][0-9]-*.md"))

css = """
@page { size: A4; margin: 18mm 18mm 20mm; }
body { font-family: Arial, sans-serif; font-size: 10.5pt; color: #0F2A44; line-height: 1.4; }
h1 { font-size: 20pt; color: #0F2A44; border-bottom: 2pt solid #0B6E69; padding-bottom: 4pt; margin-top: 0; page-break-before: always; }
h2 { font-size: 14pt; color: #0B6E69; margin-top: 16pt; }
h3 { font-size: 11.5pt; color: #0F2A44; margin-top: 12pt; }
table { border-collapse: collapse; width: 100%; margin: 6pt 0 10pt; }
th { background: #0F2A44; color: #FFFFFF; text-align: left; padding: 4pt 6pt; font-size: 9.5pt; }
td { border: 0.75pt solid #DCE1E6; padding: 4pt 6pt; vertical-align: top; font-size: 9.5pt; }
code { font-family: Consolas, monospace; font-size: 9pt; color: #0B6E69; }
pre { background: #F6F4EF; padding: 6pt; font-family: Consolas, monospace; font-size: 8.5pt; }
blockquote { border-left: 3pt solid #F5A524; margin-left: 0; padding-left: 8pt; color: #4A5868; }
.cover { text-align: left; padding-top: 120pt; }
.cover h1 { page-break-before: auto; border: 0; font-size: 30pt; margin-top: 40pt; }
.cover p { font-size: 12pt; color: #4A5868; }
.toc { list-style: none; padding-left: 0; } .toc li { margin-bottom: 3pt; }
"""

parts, toc = [], []
for f in FILES:
    text = f.read_text(encoding="utf-8")
    # Several files hold two numbered sections (e.g. "# 2. ..." and "# 3. ..."): list each top heading in the TOC.
    toc += re.findall(r"^# (.+)$", text, flags=re.M)
    html = markdown.markdown(text, extensions=["tables", "fenced_code", "sane_lists"])
    parts.append(html)

cover = f"""<div class="cover">
<img src="{LOGO}" width="300" alt="BrightSteps Recruitment">
<h1>Website documentation</h1>
<p>brightstepsrecruitment.com.au</p>
<p>BrightSteps Recruitment · 6A Edinburgh Avenue, Tamworth NSW 2340 · ABN 71 374 775 561</p>
<p>Prepared 23 November 2026</p>
<h2>Contents</h2>
<ul class="toc">{''.join(f'<li>{t}</li>' for t in toc)}</ul>
</div>"""

out = DOCS / "_compiled.html"
out.write_text(f"<!DOCTYPE html><html><head><meta charset='utf-8'><title>BrightSteps website documentation</title><style>{css}</style></head><body>{cover}{''.join(parts)}</body></html>", encoding="utf-8")
print("Wrote", out)
