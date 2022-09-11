export default function statusValidation(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ' , '')
    if(!token) return res.sendStatus(400)

    res.locals.status = token
    next()
}