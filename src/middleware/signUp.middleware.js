import joi from "joi";

export default function validationsSignUp (req, res, next) {
    const { name, email, password } = req.body
    if (!name || !email || !password){
        res.sendStatus(400)
        return
    }

    const signUpData = {
        name,
        email,
        password,
    }

    const signUpSchema = joi.object({
        name: joi.string().min(3).empty('').required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    })

    const validation = signUpSchema.validate(signUpData, { abortEarly: false })
    if (validation.error) {
        console.log(validation.error.details)
        const errors = validation.error.details.map(details => details.message)
        res.status(422).send(errors)
        return
    }
    next()
}