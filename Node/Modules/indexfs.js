import fs from 'node:fs'


let file = '';

fs.readFile('./server.js',"utf-8", (err,data)=>{
    if (err) {
        console.log(err)
    }

    file = data;

    fs.writeFile('./testFromFs.txt',file,()=>{
        console.log('Written Successfully')
    })
})


