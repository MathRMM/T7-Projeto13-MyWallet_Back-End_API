import { MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config()
console.log(process.env.MONGO_URI)
const mongoClient = new MongoClient(process.env.MONGO_URI)
let db
mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATA_BASE)
})

const Mongo_Users = async ({find, create})=>{
    if(find){
       return await db.collection('users').findOne(find)
    }
    if(create){
        return await db.collection('users').insertOne(create)
     }
} 

const Mongo_Accounts = async ({find, create})=>{
    if(find){
       return await db.collection('accounts').findOne(find)
    }
    if(create){
        return await db.collection('accounts').insertOne(create)
    }
} 

const Mongo_UpdateAccounts = async (accountId, update)=>{
        return await db.collection('accounts').updateOne(
            { _id: accountId },
            { $set: update })
}
const Mongo_Session = async ({find, create, remove})=>{
    if(find){
       return await db.collection('sessions').findOne(find)
    }
    if(create){
        return await db.collection('sessions').insertOne(create)
     }
    if(remove){
        return await db.collection('sessions').deleteMany(remove)
    }
} 

const Mongo_SessionUpdate = async (sessionId, update) =>{
    return await db.collection('sessions').updateOne(
        {_id: sessionId},
        {$set: update})
}

export {
    Mongo_Users,
    Mongo_Accounts,
    Mongo_Session,
    Mongo_UpdateAccounts,
    Mongo_SessionUpdate
}