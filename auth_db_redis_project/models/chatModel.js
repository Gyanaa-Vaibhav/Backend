import * as db from "../database/dataQuery.js";

export async function getChatMessages(){
    try{
        return db.getChatMessages()
    } catch (err){
        console.log("Error",err)
        throw new Error("Error Getting from chat")
    }
}

export async function addToDBChat(id, message){
    try{
        return  db.addToChat(id,message)
    } catch (err){
        console.log("Error",err)
        throw new Error("Error Adding to chat")
    }
}