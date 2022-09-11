import express from "express";
import signInPost from "./../controllers/signIn.controller.js";
import signInMiddleware from '../middleware/signIn.middleware.js'

const router = express.Router()

router.post('/sign-in', signInMiddleware, signInPost);

export default router