import { Mongo_Session } from "../database/dataService.js"
import { ObjectId } from 'mongodb';

export default async function accountMiddleware(req,res,next){
    const token = req.headers.authorization?.replace('Bearer ' , '')
    const {userId} = req.params
    if(!token || !userId) return res.sendStatus(401);

    try {
       const session = await Mongo_Session({find: {userId:ObjectId(userId)}})
       if(session.token !== token) return res.sendStatus(401)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
    next()
}