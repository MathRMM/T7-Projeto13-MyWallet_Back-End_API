import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config({path:"./../.env"})

const mongoClient = new MongoClient(process.env.MONGO_URI)
let db
mongoClient.connect().then(() => {
    db = mongoClient.db(process.env.DATA_BASE)
})

const Mongo_Accounts = async ({find, create})=>{
    if(find){
       return await db.collection('accounts').findOne(find)
    }
    if(create){
        return await db.collection('accounts').insertOne(create)
     }
} 

const Mongo_Session = async ({find, create, remove})=>{
    if(find){
       return await db.collection('sessions').findOne(find)
    }
    if(create){
        return await db.collection('sessions').insertOne(create)
     }
    if(remove){
        return await db.collection('sessions').deleteOne(create)
    }
} 

export {
    Mongo_Accounts,
    Mongo_Session
}