import mongodb, {MongoClient} from "mongodb";

const mongoDbClient = mongodb.MongoClient;
const uri = process.env.MONGODB_URL
const client = new mongoDbClient(uri!!, {useNewUrlParser: true, useUnifiedTopology: true});

export let connectedClient: MongoClient

export const connectToDb = () => {
    client.connect().then(client => connectedClient = client)
}



export const createClient = async () => {
    const dbClient = connectedClient.db("message-app")

        const usersCollection = () => {
            return dbClient.collection("users")
        }


        return {
            getUserByEmail: (email: string) => {
                return usersCollection().findOne({email})
            },
            getUserByName: (username: string) => {
                return usersCollection().findOne({username})
            },
            registerUser: (username: string, email: string, password: string) => {
                return usersCollection().insertOne({username, email, password, admin: false, friends: []})
            },
            getUserById: (id: string) => {
                return usersCollection().findOne({_id: id})
            },
            addUserFriend: async (user: any, friendUsername: string) => {
                const searched = await usersCollection().findOne({_id: user._id})
                if (searched.friends.find((friend: { username: string; }) => friend.username === friendUsername)) {
                    console.log("Didnt add friend since already added.")
                    return
                }
                return usersCollection().updateOne({_id: user._id}, {$push: {friends: {username: friendUsername, message: "Added as friend", time: new Date().getTime()}}})
            },
            searchUsersByName: (query: string) => {
                // case insensitive contains search.
                return usersCollection().find({username: new RegExp(`${query}`, "i")}).toArray()
            }

        }
}