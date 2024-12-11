import {Router} from "express";
import {renderChat,addToChat} from "../controller/chatController.js";
const chat = Router()

chat.get('/',renderChat)

chat.post('/',addToChat)

export default chat;