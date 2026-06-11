import ftplib
import os

FTP_HOST = "92.249.46.169"
FTP_USER = "u320880627.internet-spark.com"
FTP_PASS = "Ffenil@123"

files_to_upload = ['sitemap.xml', 'robots.txt']
base_dir = r"c:\Users\FENIL LIMBACHIYA\Downloads\internetspark website 2026"

try:
    ftp = ftplib.FTP(FTP_HOST)
    ftp.login(FTP_USER, FTP_PASS)
    print("Login successful!")
    
    for filename in files_to_upload:
        filepath = os.path.join(base_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, 'rb') as f:
                ftp.storbinary(f'STOR {filename}', f)
            print(f"Uploaded {filename} successfully.")
        else:
            print(f"File {filename} not found locally.")
            
    # Print directory listing to verify
    print("\nDirectory listing after upload:")
    print(ftp.nlst())
    
    ftp.quit()
except Exception as e:
    print(f"Failed: {e}")
