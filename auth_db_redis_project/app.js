// Modules
import express from 'express';
import helmet from "helmet";
import "dotenv/config";
import path from "path";
import * as url from "node:url";
import {rateLimiter} from "./utils/rateLimiter.js";

// Utils
import globalErrorHandler from "./utils/globalErrorHandler.js";
import jwtTokenValidator from "./utils/jwtTokenValidator.js";

// Routes Import
import register from "./routes/register.js";
import login from "./routes/loginRoutes.js";
import chat from "./routes/chatRoute.js";

const app = express();
const HOST = '0.0.0.0'
const PORT = process.env.SERVER_PORT;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static
app.use(express.static(path.join(__dirname,'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

// Middleware
app.use(rateLimiter)
// app.use(helmet());
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "'unsafe-inline'", "https://trusted-cdn.com"],
            },
        },
    })
);
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// Unprotected Routes
app.use('/register',register)
app.use('/login',login)
app.use('/chat',chat)


// Protected Routes
app.use('/*',(req,res,next)=>{
    req.headers['authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwibmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNzMzNDYzNDYwLCJleHAiOjE3MzM1NDk4NjB9.xfwAlLsHMWuxViv9LNsuUAOI9EcR_ebmKeD2xRC7lgQ'
    next()
})
app.use(jwtTokenValidator)

app.get('/pro',(req,res)=>{
    console.log(req.headers)
    console.log('Allowed')
    res.end();
})

// WildCard Path
app.get('/*',(req,res)=>{
    res.render('404')
})

// Global Error Handler
app.use(globalErrorHandler)

app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})