import express from "express";


const searchContacts = express.Router()

searchContacts.post("/search", (req, res) => {
    const {query}: {query: string} = req.params as any
    if (query.length < 3) {

        return
    }
})

export default searchContacts;
