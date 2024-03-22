import { Request, Response } from "express";
import { Wallet } from "../model/wallet.model";
import { BadRequestResponse, SuccessResponse } from "../constants/response";


class WalletController {

    public walletDetails = async(req: any, res: Response) => {
        try {
            
            const {userId} = req;

            const walletDetails : any = await Wallet.findOne({userId})
            
            if(!walletDetails){
            
                const message = "Wallet not found"
                return BadRequestResponse(res, message)
                
            }

            return SuccessResponse(res, walletDetails)

        } catch (error:any) {
            console.log(error)
            return BadRequestResponse(res, error.message);
        }

        
    };

    public balance = async(req: any, res: Response) => {
        try {
            
            const {userId} = req;

            const walletDetails : any = await Wallet.findOne({userId})
            
            if(!walletDetails){
            
                const message = "Wallet not found"
                return BadRequestResponse(res, message)
                
            }

            return SuccessResponse(res, {balance: walletDetails.balance})

        } catch (error:any) {
            console.log(error)
            return BadRequestResponse(res, error.message);
        }

        
    };
    
}

export const walletController = new WalletController();