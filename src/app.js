import cors from "cors"
import express from "express";
import signInRouter from'./routes/signIn.router.js'
import signUpRouter from'./routes/signUp.router.js'
import statusRouter from'./routes/status.router.js'
import accountsRouter from './routes/accounts.router.js'
import removeUserSession from "./removeUserSession.js";


const app = express()
app.use(cors())
app.use(express.json())

app.use(signInRouter, signUpRouter, statusRouter);
app.use(accountsRouter);

removeUserSession()

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log(`listen on ${PORT}`))