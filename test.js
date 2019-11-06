const fs = require("fs");
const decode = require("image-decode");

const image = "./image.png";


let pixels = decode(fs.readFileSync(image));

console.log(pixels.data);

function formatPixelData(pixels) {
    let output = [];
    let pixelData = Array.from(pixels.data);

    console.log(pixelData);

    for (let i = 0; i < pixelData.length; i = i + 4) {
        console.log(pixelData.slice(i,i+3));
        output.push(pixelData.slice(i,i+3));
    }

    return output;
}

console.log(formatPixelData(pixels));
