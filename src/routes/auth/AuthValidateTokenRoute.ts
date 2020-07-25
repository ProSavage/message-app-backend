import express from "express";
import {getUserFromSession} from "../../SessionManager";

const authValidateToken = express.Router()

authValidateToken.post("/validate", async (req, res) => {
    const token = req.body.token
    if (!token) {
        res.json({success: false, message: "No token was provided."})
        return
    }
    const user = await getUserFromSession(token)
    if (!user) {
        res.json({success: false, message: "Invalid token."})
        return
    }
    res.json({success: true, message: "Token is valid", user: {username: user.username, email: user.email}})
})

export default authValidateToken;