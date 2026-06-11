$ftpHost = "92.249.46.169"
$ftpUser = "u320880627.internet-spark.com"
$ftpPass = "Ffenil@123"

$ftpUrl = "ftp://$ftpHost/public_html/test_bot.txt"

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
    Write-Host "Upload status: $($response.StatusDescription)"
    $response.Close()
} catch {
    Write-Host "Error with u320880627.internet-spark.com: $_"
    
    # Try alternate username
    $ftpUser2 = "u320880627"
    try {
        $ftpRequest2 = [System.Net.FtpWebRequest]::Create($ftpUrl)
        $ftpRequest2.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
        $ftpRequest2.Credentials = New-Object System.Net.NetworkCredential($ftpUser2, $ftpPass)
        $ftpRequest2.UsePassive = $true
        
        $requestStream2 = $ftpRequest2.GetRequestStream()
        $requestStream2.Write($bytes, 0, $bytes.Length)
        $requestStream2.Close()
        
        $response2 = $ftpRequest2.GetResponse()
        Write-Host "Upload status with u320880627: $($response2.StatusDescription)"
        $response2.Close()
    } catch {
        Write-Host "Error with u320880627: $_"
    }
}
