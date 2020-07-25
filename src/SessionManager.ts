import { v4 as uuidGen } from 'uuid';
import {createClient} from "./db/MongoClient";

const sessions = new Map<string, string>();

export const createSession = (user: any) => {
    const uuid = uuidGen();
    sessions.set(uuid, user._id)
    return uuid
}

export const getUserFromSession = async (session: string) => {
    const {getUserById, getUserByEmail} = await createClient();
    // Grab ez user for test purposes.
    if (process.env.DEPLOYMENT === "DEV" && session === "dev") return getUserByEmail("naman0311@gmail.com")
    const userID = sessions.get(session);
    if (!userID) {
        return undefined
    }
    return getUserById(userID);
}
