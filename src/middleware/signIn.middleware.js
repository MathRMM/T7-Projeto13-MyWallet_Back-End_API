import joi from "joi";

export default function validationsSignIn  (req, res, next)  {
    const { email, password } = req.body
    if (!email || !password){
        res.sendStatus(400)
        return
    }

    const signInData = {
        email,
        password,
    }

    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    })

    const validation = signInSchema.validate(signInData, { abortEarly: false })
    if (validation.error) {
        console.log(validation.error.details)
        const errors = validation.error.details.map(details => details.message)
        res.status(422).send(errors)
        return 
    }
    next()
}
