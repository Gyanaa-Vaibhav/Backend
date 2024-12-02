const fs = require('fs');

const readStream = fs.createReadStream('./input.txt');
const writestream = fs.createWriteStream('./output.txt')

readStream.on('data', (chunk) => {
    try{
        writestream.write(chunk.toLocaleString().toUpperCase())
        console.log('\nReceived chunk:\n', chunk.toLocaleString().toUpperCase());
    }catch (err){
        console.log(err)
    }
});


readStream.on('end', () => {
    console.log('Finished reading file.');
});