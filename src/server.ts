import "dotenv/config";
import express from "express";
import {json, urlencoded} from "body-parser";
import cors from "cors";
import authRouter from "./routes/auth/AuthRouter";
import contactsRouter from "./routes/contacts/ContactsRouter";
import socket from "socket.io"
import {connectToDb} from "./db/MongoClient";
import {getUserFromSession} from "./SessionManager";


const app = express()

app.use(cors())
app.use(urlencoded({extended: true}))
app.use(json())


app.get("/", (req, res) => res.send("Message App Backend."))

app.use("/auth", authRouter)
app.use("/contacts", contactsRouter)

connectToDb()


const server = app.listen(5000, () => console.log(`Started server on port 5000`))


// socket setup

const io = socket(server);

const userSockets: any = {}

io.on("connection", async (socket) => {
        console.info("Made socket connection", socket.id)
        socket.on("user", async (token: string) => {
            const user = await getUserFromSession(token)
            if (!user) return
            console.log("User ", user.username, "joined.")
            userSockets[user.username] = socket
            console.log("Stored user socket reference")
        })
        socket.on("message", async (messageData: {senderToken: string, recipient: string, message: string}) => {
            const user = await getUserFromSession(messageData.senderToken)
            if (!user) return
            console.log(`${user.username} sent message "${messageData.message}" to ${messageData.recipient}`)
            const recipientSocket = userSockets[messageData.recipient]
            if (!recipientSocket) {
                console.log(`${messageData.recipient} is not connected, not sending.`)
                return
            }
            recipientSocket.emit("messaged", {
                from: user.username,
                message: messageData.message
            })
        })

    }
)


