$videoHtml = "`n<video autoplay loop muted playsinline class=`"bg-video`"><source src=`"https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connection-with-dots-and-lines-27361-large.mp4`" type=`"video/mp4`"></video>"

$htmlFiles = Get-ChildItem -Path . -Recurse -Filter *.html | Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\.git\\' }

foreach ($file in $htmlFiles) {
    $content = Get-Content $file.FullName -Raw
    if ($content -notmatch 'class="bg-video"') {
        $content = $content -replace '(?i)<body[^>]*>', "`$0$videoHtml"
        Set-Content -Path $file.FullName -Value $content
        Write-Host "Injected into $($file.Name)"
    }
}
Write-Host "Done!"
