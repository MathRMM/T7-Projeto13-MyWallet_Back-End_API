import { Mongo_Accounts, Mongo_UpdateAccounts } from "../database/dataService.js"
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';


export default async function postAccountsTransference(req,res){
    const {userId} = req.params
    const {valueInput, description} = req.body


    try {
        const account = await Mongo_Accounts({find:{userId: ObjectId(userId)}})
        console.log(account.transference)
        account.transference.push({
            value:Number(valueInput).toFixed(2), 
            description,
            time: dayjs().format('DD/MM')
        })
        let addAmount = 0
        account.transference.map(obj => addAmount += Number(obj.value))
        const update = await Mongo_UpdateAccounts(account._id, {
            userId: account.userId,
            transference: account.transference,
            amount: Number(addAmount).toFixed(2)
        })
        console.log(update)
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
}