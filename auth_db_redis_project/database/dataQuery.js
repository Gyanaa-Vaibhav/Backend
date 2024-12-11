import pool from "./pool.js";

export async function getChatMessages(){
    const query = `SELECT * FROM Messages ORDER BY sent_at DESC`
    console.log(`Executing Query ${query}`)
    const {rows} = await pool.query(query)
    return rows
}

export async function addToChat(id,message){
    const query = 'INSERT INTO Messages(sender_id,message_content) VALUES ($1,$2)'
    const values = [id,message]
    console.log(`Executing Query ${query} with Values ${values}`)
    await pool.query(query,values)
}