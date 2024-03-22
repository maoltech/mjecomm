import { Router, Request, Response } from 'express';
import { authController } from '../controller/auth.controller';
import { authMiddleWare } from "../middleware/auth.middleware";

interface IAuth {
    router: Router;
}

class AuthRoutes {
    public router= Router();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes () {
        console.log("initializeRoutes")
        this.router.post('/signup', authController.SignUp)
        this.router.post('/signin', authController.SignIn)
        this.router.get('/verify/email/link/:email/:otp', authController.VerifyMail)
        this.router.use(authMiddleWare.notOnboardedUsers)
        this.router.get('/create/phone/otp/:phone', authController.SendOtp)
        this.router.get('/verify/phone/otp/:phone/:otp', authController.VerifyOtp)
        this.router.get('/create/email/link', authController.SendEmail)
        

    }
}

export const authRoutes = new AuthRoutes();