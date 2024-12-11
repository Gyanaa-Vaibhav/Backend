import pool from "./pool.js";

async function getAllUsers(){
    try {
        const query = `SELECT * FROM test ORDER BY id ASC`;
        console.log(`Executing query: ${query}`);
        const { rows } = await pool.query(query);
        return rows;
    } catch (err) {
        console.error('Database query error:', err.message);
        throw new Error('Error fetching users');
    }
}

async function getUser(email) {
    try {
        const query = 'SELECT * FROM test where email=($1)';
        const values = [email];
        console.log(`Executing query: ${query} with values: ${values}`);
        const { rows } = await pool.query(query, values);
        return rows[0] || null; // Return null if no user is found
    } catch (err) {
        console.error('Database query error:', err.message);
        throw new Error('Error fetching users');
    }
}

async function insertUser(user,password,email){
    try{
        const query = 'INSERT INTO test (name,password,email) values ($1,$2,$3)'
        const values = [user,password,email]
        console.log(`Executing query: ${query} with values: ${values}`);
        await pool.query(query,values);
    }catch (err) {
        console.error('Insert user failed:', err.message);
        throw new Error('Could not insert user');
    }
}

export {
    getUser,
    insertUser,
    getAllUsers
}