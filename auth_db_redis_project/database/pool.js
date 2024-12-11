import pkg from 'pg';
import path from 'path';
import dotenv from 'dotenv';
import * as url from "node:url";

const __filename = url.fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const {Pool} = pkg

const pool = new Pool({
    host: process.env.DB_HOSTNAME, // or wherever the db is hosted
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT // The default port
});

export default pool