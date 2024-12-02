const fs = require('fs');
const file = fs.createWriteStream('input.txt');

for (let i = 0; i <= 1e6; i++) {
    file.write(`${i} This is a line of text repeated to create a large file.\n`);
}

file.end(() => {
    console.log('Large file created.');
});

