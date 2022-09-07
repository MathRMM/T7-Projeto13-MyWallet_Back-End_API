import  joi  from "joi";

const validationsSignUp = (res ,signUp)=>{
    const signUpSchema = joi.object({
        name: joi.string().min(3).empty('').required(),
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    })
    const validation = signUpSchema.validate(signUp, {abortEarly:false})
    if(validation.error){
        console.log(validation.error.details)
        const errors = validation.error.details.map(details => details.message)
        res.status(422).send(errors)
        return false
    }
    return true
}

const validationsSignIn = (res ,signIn)=>{
    const signInSchema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(8).required()
    })
    const validation = signInSchema.validate(signIn, {abortEarly:false})
    if(validation.error){
        console.log(validation.error.details)
        const errors = validation.error.details.map(details => details.message)
        res.status(422).send(errors)
        return false
    }
    return true
}

export {
    validationsSignUp,
    validationsSignIn}