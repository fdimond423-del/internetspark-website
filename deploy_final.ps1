$ftpHost = "92.249.46.169"
$ftpUser = "u320880627.internet-spark.com"
$ftpPass = "Ffenil@123"

function Upload-File($localPath, $remoteFileName) {
    $ftpUrl = "ftp://$ftpHost/$remoteFileName"
    $bytes = [System.IO.File]::ReadAllBytes((Resolve-Path $localPath).Path)
    $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUrl)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
    $ftpRequest.UsePassive = $true
    
    Write-Host "Uploading $remoteFileName..."
    $requestStream = $ftpRequest.GetRequestStream()
    $requestStream.Write($bytes, 0, $bytes.Length)
    $requestStream.Close()
    
    $response = $ftpRequest.GetResponse()
    Write-Host "Uploaded $remoteFileName : $($response.StatusDescription)"
    $response.Close()
}

Upload-File "website_deploy.zip" "website_deploy.zip"
Upload-File "unzip.php" "unzip.php"

Write-Host "Triggering extraction via HTTP..."
try {
    $response = Invoke-WebRequest -Uri "http://internet-spark.com/unzip.php" -UseBasicParsing -TimeoutSec 120
    Write-Host "Extraction response: $($response.Content)"
} catch {
    Write-Host "Extraction request error: $_"
}
