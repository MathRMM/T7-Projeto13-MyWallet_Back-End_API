import { Mongo_Accounts } from "../database/dataService.js"
import { ObjectId } from 'mongodb';

export default async function getAccount(req,res){
    const {userId} = req.params

    try {
        const userAccount = await Mongo_Accounts({find:{userId: ObjectId(userId)}})
        if(!userAccount) return res.sendStatus(404)
        if(!userAccount.transference)return res.status(200).send({transference: []})
        return res.status(200).send({
            transference: userAccount.transference,
            amount: userAccount.amount
        })
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}