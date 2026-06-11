$ftpHost = "92.249.46.169"
$ftpUser = "u320880627.internet-spark.com"
$ftpPass = "Ffenil@123"

$localPath = "c:\Users\FENIL LIMBACHIYA\Downloads\internetspark website 2026\index.html"
$remoteFileName = "index.html"

$ftpUrl = "ftp://$ftpHost/$remoteFileName"
$bytes = [System.IO.File]::ReadAllBytes($localPath)
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
