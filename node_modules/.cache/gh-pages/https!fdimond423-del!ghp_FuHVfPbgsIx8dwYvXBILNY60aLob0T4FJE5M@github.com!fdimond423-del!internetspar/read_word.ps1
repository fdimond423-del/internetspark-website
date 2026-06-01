$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open("C:\Users\FENIL LIMBACHIYA\Downloads\internetspark website 2026\Website content.docx")
$text = $doc.Content.Text
$text | Out-File "C:\Users\FENIL LIMBACHIYA\Downloads\internetspark website 2026\Website_content.txt" -Encoding utf8
$doc.Close()
$word.Quit()
