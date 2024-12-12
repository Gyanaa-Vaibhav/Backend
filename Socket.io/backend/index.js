import express from 'express'
import * as http from "node:http";
import {Server} from 'socket.io'
import * as url from "node:url";
import * as path from "node:path";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 5173;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
})

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('A user connected',socket.id);
    io.emit('chat message', socket.id);

    // Listen for events from the client
    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);

        // Broadcast the message to all clients
        io.emit('chat message', msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


server.listen(PORT,()=>{
    console.log(`Listening to Port ${PORT}`)
})