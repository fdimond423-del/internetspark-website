$ftpHost = "92.249.46.169"
$ftpUser = "u320880627.internet-spark.com"
$ftpPass = "Ffenil@123"
$ftpRequest = [System.Net.FtpWebRequest]::Create("ftp://$ftpHost/")
$ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectoryDetails
$ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
$response = $ftpRequest.GetResponse()
$reader = New-Object System.IO.StreamReader($response.GetResponseStream())
$output = $reader.ReadToEnd()
$reader.Close()
$response.Close()
Write-Host $output
