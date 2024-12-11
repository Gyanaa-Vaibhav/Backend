import {Router} from "express";
const loginController = Router();
import {validate,validateLogin} from "../../../shared/index.js";
import {renderLogin,handleLogin} from "../controllers/loginController.js";

loginController.get("/", renderLogin);

loginController.post("/",
    validateLogin,
    validate,
    handleLogin
)