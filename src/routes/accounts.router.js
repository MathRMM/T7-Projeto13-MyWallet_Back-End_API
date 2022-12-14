import express from "express";
import getAccountController from '../controllers/getAccounts.controller.js'
import accountsMiddleware from '../middleware/accounts.middleware.js'
import postAccountMiddleware from "../middleware/postAccounts.middleware.js";

import postAccountTransferenceController from '../controllers/postAccountsTransference.controller.js'

const router = express.Router()

router.get('/accounts/:userId', accountsMiddleware, getAccountController);
router.post('/accounts/:userId', postAccountMiddleware, postAccountTransferenceController);

export default router