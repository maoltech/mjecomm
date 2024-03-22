import  {Router} from "express";
import { onboardController } from "../controller/onboard.controller"
import { authMiddleWare } from "../middleware/auth.middleware";


class OnBoardRoutes{

    public router = Router();

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes (){
        console.log("onboarding")
        this.router.use(authMiddleWare.notOnboardedUsers)
        this.router.post('/name', onboardController.OnboardName)
        this.router.post('/bvn', onboardController.OnboardBVN )
        this.router.post('/address', onboardController.OnboardAddress)
        this.router.post('/picture', onboardController.onboardProfileImage)
        this.router.post('/complete', onboardController.completeOnboarding)
        this.router.post('/enable/otp', onboardController.enable2FA)
        this.router.post('/verify/otp', onboardController.verify2FA)
    }
    
}

export const onBoardRoutes = new OnBoardRoutes();