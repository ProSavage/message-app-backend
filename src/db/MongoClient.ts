import mongodb from "mongodb";

const MongoClient = mongodb.MongoClient;
const uri = process.env.MONGODB_URL
const client = new MongoClient(uri!!, {useNewUrlParser: true, useUnifiedTopology: true});


export const createClient = async () => {
        const connectedClient = await client.connect();
        const dbClient = connectedClient.db("message-app")

        const usersCollection = () => {
            return dbClient.collection("users")
        }


        return {
            getUserByEmail: (email: string) => {
                return usersCollection().findOne({email})
            },
            registerUser: (username: string, email: string, password: string) => {
                return usersCollection().insertOne({username, email, password, admin: false, friends: []})
            },
            getUserById: (id: string) => {
                return usersCollection().findOne({_id: id})
            },
            addUserFriend: (user: any, friendUsername: string) => {
                return usersCollection().updateOne({_id: user._id}, {$push: {friends: friendUsername}})
            }
        }
}