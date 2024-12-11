/**
 * Done
 */
import {Router} from "express";
import {loginUser, renderLogin} from "../controller/loginController.js";
import {validate, validateLogin} from "../utils/validator.js";
const login = Router();

login.get('/',renderLogin)

login.post('/',
    validateLogin,
    validate,
    loginUser
)


export default login
