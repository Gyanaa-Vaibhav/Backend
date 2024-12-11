/**
 * Done
 */
import * as registerModel from "../models/registerModel.js";

function renderRegister(req,res){
    res.render('register')
}

async function registerUser(req,res,next){
    try{
        const {username,password,email} = req.body;
        const resp = await registerModel.registerUser(username, password, email)

        if(resp) return res.status(409).json({success:false, message:'Please try Login as user already exists'})
        return res.json({success:true, message:"User Created Successfully"})

    }catch (err){
        next(err)
    }
}

export {registerUser,renderRegister}