import {Router} from "express";
import {registerUser, loginuser} from "../controller/authcontroller.js";
import {validate} from "../middlewares/validators.middleware.js";
import {userRegisterValidator, userLoginValidator} from "../validators/index.js";
const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginuser);
export default router;

