import pool from './pool.js';

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM users ORDER BY id");
    return rows;
}
async function getUser(username) {
    const query = "SELECT * FROM users WHERE username=($1)";
    const values = [username]
    const {rows} = await pool.query(query,values)
    return rows
}

async function insertUsername(username,password) {
    const query = "INSERT INTO users (username,password) VALUES ($1,$2)"
    const values = [username,password]
    await pool.query(query, values);
}

async function renameUser(initialValue,changeValue){
    const query = "UPDATE users SET username=($1) WHERE username=($2);"
    const values = [changeValue,initialValue]
    await pool.query(query,values)
}

export {
    getAllUsernames,
    insertUsername,
    renameUser,
    getUser
}
