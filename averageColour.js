let fs = require("fs");
let decode = require("image-decode");

function getAverageColour(image) {
    // Decode the image data. We only care about "data", which contains the RGBA pixel values.
    let {data, width, height} = decode(fs.readFileSync(image));
    

    // This is where we store the final "averaged" colour from the image.
    let colourValue = [0, 0, 0];

    /* 
        We iterate through each of the three colour channels (ignoring the alpha channel)
        and calculate an average for that colour.
    */
    for (let channel = 0; channel < 3; channel++) {
        values = [];
        
        for (let p = channel; p < data.length; p = p+4) {
            values.push(data[p]);

        }
        colourValue[channel] = Math.round((sum(values) / values.length));
    }

    return colourValue;
}

// I kind of dislike the reduce() function, so abstracted it away I guess...
function sum(arr) {
    return arr.reduce((a,b) => a + b, 0);
}

console.log(getAverageColour("./sunset.jpg"));