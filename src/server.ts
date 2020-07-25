import "dotenv/config";
import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth/AuthRouter";
import contactsRouter from "./routes/contacts/ContactsRouter";


const app = express()

app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())

app.use("/auth", authRouter)
app.use("/contacts", contactsRouter)


app.listen(5000, () => console.log(`Started server on port 5000`))