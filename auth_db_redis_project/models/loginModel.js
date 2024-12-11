/**
 * Done
 */
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import {getUser} from "../database/userQuery.js";
import dotenv from 'dotenv'
import path from "path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const secretKey = process.env.SECREY_KEY;

export async function loginUser(email,password){
    try {
        const userExists = await getUser(email);
        if (userExists) {
            const {name, id} = userExists
            const passValid = await bcrypt.compare(password, userExists.password);
            if (!passValid) {
                return { success: false, message: 'Wrong Password' };
            }

            const token = jwt.sign({ id,name,email }, secretKey, { expiresIn: '1d' });
            console.log(token)
            return { success: true, token };

        }
        return { success: false, message: 'User does not exist' };
    } catch (error) {
        console.error('Error in loginModel:', error);
        throw new Error('Internal Server Error');
    }
}