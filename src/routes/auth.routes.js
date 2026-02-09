import {Router} from "express";
import {registerUser, loginuser} from "../controller/authcontroller.js";
import {validate} from "../middlewares/validators.middleware.js";
import {userRegisterValidator, userLoginValidator} from "../validators/index.js";
import {logoutUser} from "../controller/authcontroller.js";
const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, loginuser);
router.route("/logout").post(userLoginValidator(), validate, logoutUser);
export default router;

