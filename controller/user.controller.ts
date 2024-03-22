import { Response } from "express"
import { BadRequestResponse, SuccessResponse } from "../constants/response"



class UserController {

    public getUser = (req: any, res: Response) =>{
        try {
            
            const { user } = req
            SuccessResponse(res, user)

        } catch (error: any) {
            BadRequestResponse(res, error.message)
        }

    }
}

export const userController = new UserController();