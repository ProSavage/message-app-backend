import express from "express";
import {createClient} from "../../db/MongoClient";
import bcrypt from "bcrypt";
import {createSession} from "../../SessionManager";

const authLoginRouter = express.Router()

authLoginRouter.post("/login", async (req, res) => {
    const {email, password} = req.body
    const {getUserByEmail} = await createClient()
    const user = await getUserByEmail(email)
    if (!user || !await bcrypt.compare(password, user.password)) {
        res.json({success: false, message: "Invalid email or password."})
        return
    }
    const token = createSession(user)
    res.json({success: true, message: "Logged in successfully.", username: user.username, email: user.email, token})
})

export default authLoginRouter;