$ftpHost = "92.249.46.169"
$ftpUser = "u320880627.internet-spark.com"
$ftpPass = "Ffenil@123"

$sourceDir = "c:\Users\FENIL LIMBACHIYA\Downloads\internetspark website 2026"

function Upload-File($localFileName) {
    $localPath = Join-Path $sourceDir $localFileName
    if (-Not (Test-Path $localPath)) {
        Write-Host "File not found: $localPath"
        return
    }

    $ftpUrl = "ftp://$ftpHost/$localFileName"
    $bytes = [System.IO.File]::ReadAllBytes($localPath)
    $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUrl)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
    $ftpRequest.UsePassive = $true
    
    Write-Host "Uploading $localFileName..."
    $requestStream = $ftpRequest.GetRequestStream()
    $requestStream.Write($bytes, 0, $bytes.Length)
    $requestStream.Close()
    
    $response = $ftpRequest.GetResponse()
    Write-Host "Uploaded $localFileName : $($response.StatusDescription)"
    $response.Close()
}

Upload-File "sitemap.xml"
Upload-File "robots.txt"
