import {Mongo_Session, Mongo_SessionUpdate} from '../database/dataService.js'

export default async function statusPost(req,res){
    const token = res.locals.status

    try {
        const authToken = await Mongo_Session({find: {token,}})
        if(!authToken) return res.sendStatus(401)
        await Mongo_SessionUpdate(authToken._id, {
            token: authToken.token,
            userId: authToken.userId,
            lastStatus: Date.now()
        })
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}