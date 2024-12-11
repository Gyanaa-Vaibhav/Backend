/**
 * Done
 */

import bcrypt from 'bcrypt'
import * as db from "../database/userQuery.js";

async function registerUser(username,password,email){

    const usersData = await db.getUser(email)
    const hashedPass = (await bcrypt.hash(password,10))

    if(!usersData){
        await db.insertUser(username,hashedPass,email)
        return false
    }else{
        return true
    }
}

export {registerUser}