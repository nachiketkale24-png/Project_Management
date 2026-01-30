import {Router} from "express";
import {registerUser} from "../controller/authcontroller.js";

const router = Router();

router.route("/register").post(registerUser) ;
 
export default router;

