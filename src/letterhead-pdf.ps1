# Exports the letterhead .docx to PDF using Microsoft Word (keeps Word's exact layout).
$docx = Join-Path $PSScriptRoot "..\brand\letterhead\BrightSteps-Letterhead.docx" | Resolve-Path
$pdf  = [IO.Path]::ChangeExtension($docx, ".pdf")
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
  $doc = $word.Documents.Open([string]$docx, $false, $true)
  $doc.ExportAsFixedFormat($pdf, 17)   # 17 = wdExportFormatPDF
  $doc.Close($false)
  "Wrote $pdf"
} finally { $word.Quit() }
