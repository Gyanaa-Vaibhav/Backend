/**
 * Done
 */
import {Router} from "express";
import {registerUser, renderRegister} from "../controller/registerController.js";
import {validateRegister,validate} from "../utils/validator.js";
const register = Router();

register.get('/',renderRegister)

register.post('/',
    validateRegister,
    validate,
    registerUser
)

export default register;