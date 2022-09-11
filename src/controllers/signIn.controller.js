import dayjs from 'dayjs';
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import {
    Mongo_Session,
    Mongo_Users
} from "../database/dataService.js";


export default async function signInPost(req, res) {
    const { email, password } = req.body

    try {
        // data verification in DB
        const user = await Mongo_Users({ find: { email, } })
        if (!user) return res.sendStatus(401)
        // password verification 
        if (!bcrypt.compareSync(password, user.hashPassword)) return res.sendStatus(401)
        // log into session
        const token = uuid()
        await Mongo_Session({
            create: {
                token,
                userId: user._id,
                lastStatus: Date.now()
            }
        })
        return res.status(200).send({ 
            token,
            userId: user._id,
            name: user.name })
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}