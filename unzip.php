<?php
$zip = new ZipArchive;
if ($zip->open('website_deploy.zip') === TRUE) {
    $zip->extractTo('./');
    $zip->close();
    echo 'Extraction successful. ';
    if(unlink('website_deploy.zip')) echo 'Zip removed. ';
    if(unlink(__FILE__)) echo 'Script removed.';
} else {
    echo 'Failed to open the zip file.';
}
?>
