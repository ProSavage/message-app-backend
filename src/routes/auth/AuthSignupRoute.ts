import express from "express";
import {createClient} from "../../db/MongoClient";
import bcrypt from "bcrypt";

const authSignupRouter = express.Router()

authSignupRouter.post("/signup", async (req, res) => {
    const {username, email, password} = req.body
    const { getUserByEmail, registerUser } = await createClient()
    const user = await getUserByEmail(email)
    if (user) {
        res.json({success: false, message: "email is already registered!"})
        return
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await registerUser(username, email, passwordHash)
    res.json({success: true, message: "Registered user"})
})

export default authSignupRouter;