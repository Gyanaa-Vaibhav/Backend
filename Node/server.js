require('dotenv').config()
const express = require('express');
const fs = require('node:fs')
const app = express();
const port = process.env.PORT || 5500;
const path = require('path')
const authorRouter = require('./routes/user.js')
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.get('/',(req,res)=>{
    res.locals.foo = "foo ?";
    // fs.readFile('./HTML/index.html',(err,data) => res.sendFile(`${__dirname}/HTML/index.html`))
    res.render('./index.ejs',{message : 'This is Ejs Test'})
})

app.get('/index',(req,res)=>{
    res.redirect('/')
})

app.get('/home',(req,res)=>{
    res.redirect('/')
})

// app.use((req,res,next)=>{
//     console.log("Inside Middleware");
//     next()
// })

app.use("/user",authorRouter)

app.get('/about',(req,res)=>{
    res.sendFile(`${__dirname}/HTML/about.html`)
    console.log('About Path')
})

app.get('/contact',(req,res)=>{
    res.sendFile(`${__dirname}/HTML/contact.html`)
    console.log('Contact Path')
})
app.get('/:username/contact',(req,res)=>{
    console.log(req.params)
    console.log(req.query)
    res.sendFile(`${__dirname}/HTML/contact.html`)
    console.log('Contact Path')
})

app.use((req,res)=>{
    console.log('404')
    res.status(404).sendFile(`${__dirname}/HTML/404.html`)
})

app.listen(port,()=>{
    console.log(`My first Express app - listening on port ${port}!`);
})
