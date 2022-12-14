import { Mongo_Accounts, Mongo_UpdateAccounts } from "../database/dataService.js"
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';


export default async function postAccountsTransference(req,res){
    const {userId} = req.params
    const {value, description, type} = req.body


    try {
        const account = await Mongo_Accounts({find:{userId: ObjectId(userId)}})
        account.transference.push({
            value:Number(value).toFixed(2), 
            description,
            time: dayjs().format('DD/MM'),
            type,
        })
        let addAmount = 0
        account.transference.map(obj => addAmount += Number(obj.value))
        const update = await Mongo_UpdateAccounts(account._id, {
            userId: account.userId,
            transference: account.transference,
            amount: Number(addAmount).toFixed(2)
        })
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}