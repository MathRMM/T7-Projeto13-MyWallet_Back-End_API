import express from "express";
import signUpPost from "./../controllers/signUp.controller.js";
import signUpMiddleware from '../middleware/signUp.middleware.js'

const router = express.Router()

router.post('/sign-up',signUpMiddleware, signUpPost);

export default router