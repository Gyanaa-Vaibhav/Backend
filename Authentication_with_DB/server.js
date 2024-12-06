import express from 'express';
import path from "path";
import * as url from "node:url";
import * as db from './db/query.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Redis from "ioredis";
import limiter from "./ratelimiter.js";
import {validate,registerUser,loginUser} from "./validator.js";
import {getUser} from "./db/query.js";

const redis = Redis()
const __filename = url.fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)
const PORT = process.env.SERVER_PORT || 6969;
const app = express();
const secretKey = 'gydsaksdasdap';

app.use(limiter)
app.use(express.json())

app.get('/',async (req,res)=>{
    const names = await db.getAllUsernames()
    console.log(names)
    res.end()
})

//
// app.get('/login', async (req, res) => {
//     try {
//         const authHeader = req.headers['authorization'];
//         const token = authHeader && authHeader.split(' ')[1];
//
//         if (!token) {
//             return res.status(401).json({ message: 'Token is required' });
//         }
//
//         jwt.verify(token, secretKey, async (err, user) => {
//             if (err) {
//                 if (err.name === 'TokenExpiredError') {
//                     return res.status(401).json({ message: 'Token expired' });
//                 }
//                 return res.status(403).json({ message: 'Invalid token' });
//             }
//
//             const sessionKey = `session:${user.id}:${req.ip}`;
//             const session = await redis.get(sessionKey);
//
//             if (!session) {
//                 await redis.set(sessionKey, 1, 'EX', 3600); // Set session with expiry
//             } else if (parseInt(session, 10) >= 150) {
//                 return res.status(429).json({ message: 'Too many requests. Please try again later.' });
//             } else {
//                 await redis.incr(sessionKey); // Increment session counter
//             }
//
//             return res.status(200).json({
//                 message: 'Login successful',
//                 user: { id: user.id, username: user.username }, // Return only necessary fields
//             });
//         });
//     } catch (err) {
//         console.error('Error during login:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

app.post('/register',registerUser, validate, async (req,res)=>{
    try{
        const { user,password } = req.body
        const hashedPass = await bcrypt.hash(password,10)
        await db.insertUsername(user,hashedPass)
    res.end()
    }catch (err){
        console.log(err)
    }
})

app.post('/login',loginUser, validate, async (req,res)=>{
    try{
        const {loginUser,loginPass} = req.body
        const [users] = await getUser(loginUser)

        if(users){
            const token = jwt.sign({users},secretKey)
            console.log(token)
            console.log("Yes")
            const {username,password} = users
            console.log(username,password)
            const ans = await bcrypt.compare(loginPass,password)
            console.log(ans)
            res.end(token)
        }else{
            res.end() // Does Not Exist
        }

    }catch (err){
        console.log(err)
    }
})

app.post('/changeDetails/:username',async (req,res)=>{
    try{
        const changedName = req.body.user
        const currentName = req.params.username
        await db.renameUser(currentName,user)
    res.end()
    }catch (err){
        console.log(err)
    }
})

app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})