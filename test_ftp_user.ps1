$ftpHost = "92.249.46.169"
$ftpUser = "u320880627"
$ftpPass = "Ffenil@123"

$ftpUrl = "ftp://$ftpHost/test_bot.txt"
$source = "Hello from Bot"
$bytes = [System.Text.Encoding]::UTF8.GetBytes($source)

try {
    $ftpRequest = [System.Net.FtpWebRequest]::Create($ftpUrl)
    $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
    $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($ftpUser, $ftpPass)
    $ftpRequest.UsePassive = $true
    
    $requestStream = $ftpRequest.GetRequestStream()
    $requestStream.Write($bytes, 0, $bytes.Length)
    $requestStream.Close()
    
    $response = $ftpRequest.GetResponse()
    Write-Host "Upload status root: $($response.StatusDescription)"
    $response.Close()
} catch {
    Write-Host "Error root: $_"
}
