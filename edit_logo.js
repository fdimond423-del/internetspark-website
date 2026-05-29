const { Jimp } = require("jimp");
const fs = require("fs");

async function editLogo() {
  const buffer = fs.readFileSync("images/logo.png");
  const image = await Jimp.read(buffer);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    const a = this.bitmap.data[idx + 3];

    // If the pixel is dark (black) and opaque
    if (r < 60 && g < 60 && b < 60 && a > 10) {
      this.bitmap.data[idx + 0] = 255;
      this.bitmap.data[idx + 1] = 255;
      this.bitmap.data[idx + 2] = 255;
    }
  });

  const outBuffer = await image.getBuffer("image/png");
  fs.writeFileSync("images/logo_white.png", outBuffer);
  console.log("Logo updated to white");
}

editLogo().catch(console.error);
