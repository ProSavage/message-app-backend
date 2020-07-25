import express from "express";
import authLogin from "./AuthLoginRoute";
import authSignup from "./AuthSignupRoute";
import authValidateToken from "./AuthValidateTokenRoute";
import authChangePassword from "./AuthValidateTokenRoute";

const authRouter = express.Router();

authRouter.use("/", authLogin)
authRouter.use("/", authSignup)
authRouter.use("/", authValidateToken)

export default authRouter;