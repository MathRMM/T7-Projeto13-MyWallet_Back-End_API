import bcrypt from 'bcrypt'
import { Mongo_Accounts, Mongo_Users } from "../database/dataService.js";

export default async function signUpPost(req, res) {
    const { name, email, password } = req.body
    const SALT = Number(process.env.SALT)

    //encrypt password
    const hashPassword = bcrypt.hashSync(password, SALT)
    try {
        // data verification to not create existing accounts
        if (await Mongo_Users({ find: { email, } })) return res.sendStatus(409)
        //create account
        const user = await Mongo_Users({
            create: {
                name,
                email,
                hashPassword
            }
        })
        await Mongo_Accounts({create: {
            userId: user.insertedId,
            transference: [],
            amount:0
        }})
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }

}