import express from "express";
import authenticateRequest from "../../middleware/AuthenticatorMiddleware";
import getContacts from "./GetContactsRoute";


const contactsRouter = express.Router();

contactsRouter.use("/", async (req, res, next) => {
    await authenticateRequest(false, req, res, next)
})

contactsRouter.use("/", getContacts)

export default contactsRouter;