import express from "express";
import {getUserFromReq} from "../../middleware/AuthenticatorMiddleware";
import {createClient} from "../../db/MongoClient";

const getContacts = express.Router();

getContacts.get("/all", async (req, res) => {
    const user = getUserFromReq(req)
    res.json({success: true, friends: user.friends})
})


export default getContacts;