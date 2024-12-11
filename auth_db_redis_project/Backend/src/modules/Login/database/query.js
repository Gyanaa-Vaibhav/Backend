import {pool} from "../../../shared/index.js";

export async function getAllUsers(){
    const query = 'SELECT * FROM users';
    console.log(`Executing query: ${query}`);
    const {rows} = await pool.query('SELECT * FROM users');
    return rows;
}

export async function getUser(user){
    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [user];
    console.log(`Executing query: ${query} with values: ${values}`);
    const {rows} = await pool.query(query, values);
    return rows;
}