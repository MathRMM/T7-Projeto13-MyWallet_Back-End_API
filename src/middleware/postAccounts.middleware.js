import { Mongo_Session } from "../database/dataService.js"
import { ObjectId } from 'mongodb';
import joi from 'joi'

export default async function postAccountMiddleware(req,res,next){
    const token = req.headers.authorization?.replace('Bearer ' , '')
    const {userId} = req.params
    const {value, description, type} = req.body
    if(!token || !userId || !value ||
         !description || !type) return res.sendStatus(400);

    const bodySchema = joi.object({
        value: joi.number().required(),
        description: joi.string().required(),
        type: joi.string().valid('input', 'output').required()
    })
    const validation = bodySchema.validate({
        value,
        description,
        type,
    })

    console.log(type, description)

    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message)
        return res.status(422).send(errors)
    }

    try {
       const session = await Mongo_Session({find: {token,}})
       if(!session || !session.userId.equals(ObjectId(userId))) return res.sendStatus(401)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
    next()
}