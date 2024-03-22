import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { Response, NextFunction } from "express";
import { walletController } from "../controller/wallet.controller";


class WalletRoutes{

    public router = Router();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes (){
        
        
        this.router.use(authMiddleWare.notOnboardedUsers)
        this.router.get('/', walletController.walletDetails)
        this.router.get('/balance', walletController.balance)
        
        

        
    }
    
}

export const walletRoutes = new WalletRoutes();