$response = Invoke-RestMethod -Uri 'https://internet-spark.com/'
if ($response -match 'google-site-verification') {
    Write-Host 'Tag Found!'
} else {
    Write-Host 'Tag NOT Found'
}
