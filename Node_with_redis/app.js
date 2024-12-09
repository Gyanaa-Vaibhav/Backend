import express from 'express'
const app  = express();
import Redis from 'ioredis';

// Connect to Redis (local instance)
// const redis = new Redis(); // Defaults to localhost:6379
// async function main() {
//     try {
//         await redis.set('greeting', 'Hello, Redis!');
//         const greeting = await redis.get('greeting');
//         console.log('Greeting from Redis:', greeting);
//         await redis.set('temp', 'This will expire', 'EX', 10);
//         const ttl = await redis.ttl('temp');
//         console.log('TTL for temp key:', ttl, 'seconds');
//         redis.quit();
//     } catch (err) {
//         console.error('Error connecting to Redis:', err);
//     }
// }

const redis = new Redis();
app.get('/',async (req,res)=>{
    console.log('IP',req.ip)
    const redisData = await redis.get('todos')
    if(redisData) return res.json(JSON.parse(redisData))

    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(res => res.json())
        .then(async data => {
            await redis.set('todos', JSON.stringify(data))
            return res.json(data)
        })
})

app.listen(5010,()=>{
    console.log('Running on PORT 5010')
})