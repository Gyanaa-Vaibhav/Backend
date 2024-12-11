import express from "express";
import helmet from 'helmet'
import cors from 'cors';
import dotenv from "dotenv";
import * as path from "node:path";
import * as url from 'node:url';
import {Server} from "socket.io";
import * as http from "node:http";
import {globalErrorHandler,rateLimiter} from "./shared/index.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server)
const PORT = 6969;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

app.use(rateLimiter)
app.use(cors());
app.use(helmet());
app.use(express.json());

console.log("From .env",process.env.TEST)

app.get('/',(req,res)=>{
    res.json({message : 'Hello From Server and pm2'});
})

app.post('/login',(req,res)=>{
    console.log(req.body)
    res.json({message : 'Hello From Server and pm2'});
})

app.use(globalErrorHandler)

server.listen(PORT,()=>{
    console.log(`Listening to Port ${PORT}`)
})