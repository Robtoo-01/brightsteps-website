// Builds brand/letterhead/BrightSteps-Letterhead.docx. Needs the "docx" npm package (v9).
// Run: node src/letterhead.cjs   (then export the PDF from Word, or run src/letterhead-pdf.ps1)
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Header, Footer, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, VerticalAlign,
} = require("docx");

const root = path.join(__dirname, "..");
const out = path.join(root, "brand", "letterhead");
const logo = fs.readFileSync(path.join(out, "logo-horizontal.png"));

// Brand colours (see docs/02-brand-and-ux-strategy.md)
const NAVY = "0F2A44", TEAL = "0B6E69", SLATE = "4A5868", GREY = "8995A3";
const FONT = "Arial"; // Atkinson Hyperlegible is the brand body font; swap here if it is installed on every PC that uses the template.

// A4 with 2 cm side margins: content width 11906 - 2 * 1134 = 9638 DXA
const CONTENT = 9638;
const none = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: none, bottom: none, left: none, right: none, insideHorizontal: none, insideVertical: none };

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 21, color: o.color || NAVY, bold: o.bold, italics: o.italics });
const para = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { after: o.after ?? 0, before: o.before ?? 0, line: o.line }, alignment: o.align, border: o.border, tabStops: o.tabStops });
const placeholder = (text) => run(text, { color: GREY });

const contactLine = (label, value) => para([run(label + "  ", { size: 16, color: TEAL, bold: true }), run(value, { size: 16, color: NAVY })], { align: AlignmentType.RIGHT, after: 20 });

const header = new Header({
  children: [
    new Table({
      width: { size: CONTENT, type: WidthType.DXA },
      columnWidths: [5200, 4438],
      borders: noBorders,
      rows: [new TableRow({
        children: [
          new TableCell({
            width: { size: 5200, type: WidthType.DXA }, borders: noBorders, verticalAlign: VerticalAlign.CENTER, margins: { left: 0, right: 0 },
            children: [para(new ImageRun({ type: "png", data: logo, transformation: { width: 222, height: 60 }, altText: { title: "BrightSteps Recruitment", description: "BrightSteps Recruitment logo", name: "logo" } }))],
          }),
          new TableCell({
            width: { size: 4438, type: WidthType.DXA }, borders: noBorders, verticalAlign: VerticalAlign.CENTER, margins: { left: 0, right: 0 },
            children: [
              contactLine("PHONE", "0424 234 925"),
              contactLine("EMAIL", "info@brightstepsrecruitment.com.au"),
              contactLine("WEB", "brightstepsrecruitment.com.au"),
            ],
          }),
        ],
      })],
    }),
    // Brand rule: teal line under the header
    para(run(""), { before: 120, after: 0, border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: TEAL, space: 1 } } }),
  ],
});

const footer = new Footer({
  children: [
    para(run(""), { after: 80, border: { top: { style: BorderStyle.SINGLE, size: 6, color: "DCE1E6", space: 1 } } }),
    para([
      run("BrightSteps Recruitment", { size: 15, color: NAVY, bold: true }),
      run("   ·   6A Edinburgh Avenue, Tamworth NSW 2340   ·   ABN 71 374 775 561", { size: 15, color: SLATE }),
    ], { align: AlignmentType.CENTER, after: 40 }),
    para([
      run("Reliable people. Right when you need them.", { size: 15, color: TEAL, bold: true }),
      run("   ·   Labour hire  ·  Disability support  ·  Community services  ·  24/7 support", { size: 15, color: SLATE }),
    ], { align: AlignmentType.CENTER }),
  ],
});

// Sample letter body: grey bracketed placeholders show where to type.
const body = [
  para(placeholder("[Date, e.g. 23 November 2026]"), { before: 240, after: 360 }),
  para(placeholder("[Recipient name]")),
  para(placeholder("[Position]")),
  para(placeholder("[Organisation]")),
  para(placeholder("[Street address]")),
  para(placeholder("[Town NSW Postcode]"), { after: 360 }),
  para([run("Dear "), placeholder("[Name]"), run(",")], { after: 240 }),
  para(run("Re: ", { bold: true }), { after: 0 }),
  para(placeholder("[Subject of the letter]"), { after: 240 }),
  para(placeholder("[Start typing your letter here. Body text is 10.5 pt Arial with 1.15 line spacing. Keep paragraphs short and use plain Australian English.]"), { after: 200, line: 276 }),
  para(placeholder("[Second paragraph.]"), { after: 200, line: 276 }),
  para(placeholder("[Closing paragraph, with a clear next step, for example: please call me on 0424 234 925 if you have any questions.]"), { after: 360, line: 276 }),
  para(run("Kind regards,"), { after: 720 }),
  para(run("Edwin Ngetich", { bold: true })),
  para(run("Director, BrightSteps Recruitment", { color: SLATE })),
];

const doc = new Document({
  creator: "BrightSteps Recruitment",
  title: "BrightSteps Recruitment letterhead",
  description: "Letterhead template",
  styles: { default: { document: { run: { font: FONT, size: 21, color: NAVY } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 2268, bottom: 1701, left: 1134, right: 1134, header: 567, footer: 567 } } },
    headers: { default: header },
    footers: { default: footer },
    children: body,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  const file = path.join(out, "BrightSteps-Letterhead.docx");
  fs.writeFileSync(file, buf);
  console.log("Wrote", file);
});
