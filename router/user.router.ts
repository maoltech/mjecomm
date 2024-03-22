import { Router } from "express";
import { authMiddleWare } from "../middleware/auth.middleware";
import { userController } from "../controller/user.controller";


class UserRoutes {

    public router = Router();

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes = () => {

        this.router.use(authMiddleWare.AuthenticateOnboardedUsers)
        this.router.get('/', userController.getUser)
    }

}

export const userRoutes = new UserRoutes();