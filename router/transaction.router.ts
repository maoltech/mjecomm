import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { Response, NextFunction } from "express";
import { transactionController } from "../controller/transaction.controller";


class TransactionRoutes{

    public router = Router();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes (){
        
        this.router.post('/webhook', transactionController.fund )
        this.router.use(authMiddleWare.notOnboardedUsers)
        this.router.post('/withdraw', transactionController.withdraw )
        this.router.get('/history', transactionController.transactionHistory)
        this.router.post('/verify/account', transactionController.verifyAccountDetails)
        this.router.get('/bank/list', transactionController.banklist)
        
    }
    
}

export const transactionRoutes = new TransactionRoutes();