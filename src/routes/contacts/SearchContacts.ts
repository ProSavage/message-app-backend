import express from "express";
import {getUserFromReq} from "../../middleware/AuthenticatorMiddleware";
import {createClient} from "../../db/MongoClient";


const searchContacts = express.Router()

searchContacts.post("/search", async (req, res) => {
    const query = req.body.query
    if (query.length < 3) {
        res.json({success: false, message: "Query was too generic."})
        return
    }

    const {searchUsersByName} = await createClient()
    const users = (await searchUsersByName(query)).map(user => user.username)
    res.send({success: true, users})




})

export default searchContacts;
