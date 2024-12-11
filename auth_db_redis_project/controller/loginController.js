/**
 * Done
 */
import * as loginModel from '../models/loginModel.js'

export function renderLogin(req,res){
    res.render('login')
}

export async function loginUser(req,res,next){
    try{
        console.log(req.body)
        const { email, password } = req.body;
        const result = await loginModel.loginUser(email, password);

        if (result.success === false) {
            return res.status(401).json(result);
        }
        console.log('Redirecting')
        return res.status(200).json(result);
        // return res.redirect('/chat');

    }catch (err){
        next(err)
    }
}