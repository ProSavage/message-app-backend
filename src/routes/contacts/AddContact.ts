import express from "express";
import {createClient} from "../../db/MongoClient";
import {getUserFromReq} from "../../middleware/AuthenticatorMiddleware";

const addContact = express.Router()


addContact.post("/add", async (req, res) => {
    const {username}: {username: string} = req.body
    if (!username) {
        res.json({success: false, message: "No username was provided."})
        return
    }

    const {addUserFriend, getUserByName} = await createClient()
    const searchedUser = await getUserByName(username)
    // Dont want to send error message, or it can be used to search valid users.
    if (searchedUser) {
        addUserFriend(getUserFromReq(req), searchedUser.username)
    }
    res.json({success: true, message: "Add friend."})


})


export default addContact;