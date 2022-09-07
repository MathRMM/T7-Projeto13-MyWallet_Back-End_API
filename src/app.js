import cors from "cors"
import {v4 as uuid} from 'uuid'
import express from "express";
import dayjs from 'dayjs';
import  joi  from "joi";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config({path:"./../.env"});


import { validationsSignUp, validationsSignIn } from "./validate.js";

import {
    Mongo_Accounts,
    Mongo_Session
} from "./dataService.js";

const app = express()
app.use(cors())
app.use(express.json())

const SALT = Number(process.env.SALT)

/* --------- Enter and create accounts -------------- */

app.post('/sign-up', async(req,res)=>{
    //data validation
    const {name, email, password} = req.body
    if(!validationsSignUp({name, email, password})) return res.sendStatus(400)
    
    //encrypt password
    const hashPassword = bcrypt.hashSync(password, SALT)
    try {
        // data verification to not create existing accounts
        if(await Mongo_Accounts({find: {email,}})) return res.sendStatus(409)
        //create account
        const response = await Mongo_Accounts({create:{
            name,
            email,
            hashPassword
        }})
        return res.sendStatus(200)
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }

});

app.post('/sign-in', async(req,res)=>{
    const {email, password} = req.body
    //data validation
    if(!validationsSignIn({email,password,})) return res.sendStatus(400)

    try {
        // data verification in DB
        const user = await Mongo_Accounts({find: {email,}})
        if(!user) return res.sendStatus(404)
        // password verification 
        if(!bcrypt.compareSync(password, user.hashPassword)) return res.sendStatus(401)
        // log into session
        const token = uuid()
        const session = await Mongo_Session({create: {
            token,
            userId:user._id,
        }})
        return res.status(200).send({token,})
    } catch (error) {
        console.error(error)
        return res.sendStatus(500)
    }
});

app.get('/status', async(req,res)=>{
    const {token} = req.headers
    console.log(token)
    if(!token) return res.sendStatus(400)
    res.sendStatus(200)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`listen on ${PORT}`))