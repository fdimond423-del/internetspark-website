const Jimp = require('jimp');

async function checkBg() {
  const image = await Jimp.read('images/sir.png');
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  
  const topLeft = Jimp.intToRGBA(image.getPixelColor(0, 0));
  const topRight = Jimp.intToRGBA(image.getPixelColor(width - 1, 0));
  const bottomLeft = Jimp.intToRGBA(image.getPixelColor(0, height - 1));
  const bottomRight = Jimp.intToRGBA(image.getPixelColor(width - 1, height - 1));
  
  console.log(`Dimensions: ${width}x${height}`);
  console.log(`Top Left:`, topLeft);
  console.log(`Top Right:`, topRight);
  console.log(`Bottom Left:`, bottomLeft);
  console.log(`Bottom Right:`, bottomRight);
}

checkBg().catch(console.error);
