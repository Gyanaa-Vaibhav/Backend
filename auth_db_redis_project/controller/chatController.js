import {getChatMessages,addToDBChat} from "../models/chatModel.js";
import Redis from "ioredis";

const redis = new Redis();
const subscriber = new Redis();
await subscriber.subscribe('chat')

export async function renderChat(req,res,next){
    try{
        const message = getChatMessages();
        const cMsg = [];
        const test = 'Hello'

        // Cached chats for new/active users
        const result = await redis.lrange('messages',0,-1)
        result.map(r => cMsg.push(JSON.parse(r)))

        // Active In line chat
        subscriber.on('message',(channel,cMessage)=>{
            cMsg.push(cMessage)
            return res.render('chat', {test,chat : cMsg})
        })

        res.render('chat', {test,chat : cMsg})
    }catch (err){
        next(err)
    }
}

export async function addToChat(req, res, next) {
    try {
        const { id, name } = req.user;
        const { message } = req.body;

        if (!message || !id || !name) {
            return res.redirect('/chat?error=InvalidInput');
        }

        const messageData = JSON.stringify({ id, name, message });

        // Add message to Redis list and publish to the 'chat' channel
        await redis.lpush('messages', messageData);
        await redis.publish('chat', messageData);

        // Redirect to chat page cause no websockets
        res.redirect('/chat');
        await addToDBChat(id, message)

    } catch (err) {
        next(err);
    }
}

