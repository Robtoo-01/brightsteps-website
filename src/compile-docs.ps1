# Turns docs/_compiled.html into a PDF (Microsoft Edge) and a .docx (Microsoft Word), then deletes the HTML.
$docs = Join-Path $PSScriptRoot "..\docs" | Resolve-Path
$html = Join-Path $docs "_compiled.html"
$docx = Join-Path $docs "BrightSteps-Website-Documentation.docx"
$pdf  = Join-Path $docs "BrightSteps-Website-Documentation.pdf"
$edge = Join-Path ${env:ProgramFiles(x86)} "Microsoft\Edge\Application\msedge.exe"
$uri  = ([Uri]$html).AbsoluteUri
& $edge --headless=new --disable-gpu --no-pdf-header-footer "--print-to-pdf=$pdf" $uri 2>$null | Out-Null
Start-Sleep -Seconds 2
"Wrote $pdf"
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0
try {
  $doc = $word.Documents.Open([string]$html, $false, $true)
  $doc.SaveAs2([string]$docx, 16)   # 16 = .docx
  $doc.Close($false)
  "Wrote $docx"
} finally { $word.Quit() }
Remove-Item $html
