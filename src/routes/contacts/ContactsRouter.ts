import express from "express";
import authenticateRequest from "../../middleware/AuthenticatorMiddleware";
import getContacts from "./GetContactsRoute";
import searchContacts from "./SearchContacts";
import addContact from "./AddContact";


const contactsRouter = express.Router();

contactsRouter.use("/", async (req, res, next) => {
    await authenticateRequest(false, req, res, next)
})

contactsRouter.use("/", getContacts)
contactsRouter.use("/", searchContacts)
contactsRouter.use("/", addContact)

export default contactsRouter;