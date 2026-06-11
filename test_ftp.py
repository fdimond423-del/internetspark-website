import ftplib

FTP_HOST = "92.249.46.169"
FTP_USER = "u320880627.internet-spark.com"
FTP_PASS = "Ffenil@123"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    print("Login successful with u320880627.internet-spark.com!")
    print(ftp.pwd())
    print(ftp.nlst())
    ftp.quit()
except Exception as e:
    print(f"Failed with u320880627.internet-spark.com: {e}")
    try:
        FTP_USER2 = "u320880627"
        ftp = ftplib.FTP(FTP_HOST)
        ftp.login(FTP_USER2, FTP_PASS)
        print("Login successful with u320880627!")
        print(ftp.pwd())
        print(ftp.nlst())
        ftp.quit()
    except Exception as e2:
        print(f"Failed with u320880627: {e2}")
