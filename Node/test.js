const os = require('Modules/os.js')
const fs = require('fs')
const path = require('node:path');
const http = require('http')
const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

let log = '';

const server = http.createServer((req,res)=>{
    let path = 'HTML/'
    switch(req.url){
        case '/':
            path += 'index.html'
            break;
        case '/index':
            path += 'index.html'
            break;
        case '/home':
            path += 'index.html'
            break;
        case '/about':
            path += 'about.html'
            break;
        case '/contact':
            path += 'contact.html'
            break;
        default :
            path += '404.html'
            break;
    }

    res.setHeader('Content-Type','text/html')
    fs.readFile(path,(err,data)=>{
        if(err) {
            console.log('Error')
            res.end()
        }else{
            const time = new Date().toTimeString().slice(0,9)
            const date = new Date().toDateString()
            log += (`\n ${date} ${time} at ${req.url}`)
            console.log("Log Files",log)
            res.end(data)
        }
    })
})


server.listen(5501,'localhost',()=>{
    console.log('Listening on ',5501)
})
