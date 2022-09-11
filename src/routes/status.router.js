import express from "express";
import statusPost from "./../controllers/status.controller.js";
import statusMiddleware from '../middleware/status.middleware.js'

const router = express.Router();

router.post('/status',statusMiddleware, statusPost);

export default router