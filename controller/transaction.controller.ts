import { Request, Response } from "express";
import { Transaction } from "../model/transaction.model";
import { Wallet } from "../model/wallet.model";
import { BadRequestResponse, ServerResponse, SuccessResponse } from "../constants/response";
import { transactionValidation } from "../validation/transaction.validation";
import { transactionUtils } from "../utils/transaction.utils";
import { transactionService } from "../service/transaction.service";
import { messages } from "../service/message.service";


class TransactionController {

    public fund = async(req: Request, res: Response) => {
        try {
            
            const {id, customer, ...others} = req.body.data;

            const updatedWallet : any = await Wallet.findOne({email: customer.email})
            updatedWallet?.balance + req.body.data.amount 
            
            const saveData = { 
                ...others, 
                customer_fullname: customer.fullname,
                customer_email: customer.email,
                customer_phone_number: customer.phone_number,
                customer_created_at: customer.created_at,
                userId: updatedWallet?.userId,
                walletId: updatedWallet?.walletId
             }
    
            const savedData = await Transaction.create(saveData);
            if(savedData){
                await updatedWallet.save()
                const message = "successfull"
                return SuccessResponse(res, message)
            }

        } catch (error:any) {
            console.log(error)
            return BadRequestResponse(res, error.message);
        }

        
    };
    
    public withdraw = async(req: any, res: Response) => {

        try {
            const {userId, body, userMail} = req
            const {error} = transactionValidation.withdrawRequest(body);
            if(error) {
                const message ={ error: error.details[0].message }
                return BadRequestResponse(res, message); 
            }
            
            const userWallet =  await Wallet.findOne({userId})
            if(!userWallet){
                const message = "Wallet not found"
                return BadRequestResponse(res, message);
            }

            if( body.amount > userWallet.balance){
                const message = "Insufficient Balance"
                return BadRequestResponse(res, message);
            }

            const reference = transactionUtils.transanctionRef(userId)

            const payload = {
                ...body, reference, debit_currency: "NGN", callback_url: `${process.env.BACKEND_URL as string}/callback`
            }
            
           const response = await transactionService.transfer(payload, userId, userWallet._id)
            
           if(response){
            const message = `
                            Dear User,

                            We have processed a debit bank transfer from your account to the following recipient:

                            Recipient Account: ${response.account_number}
                            Transfer Amount: ${response.amount}
                            Reference: ${reference}

                            Thank you for choosing our services.

                            Regards,
                            Your Bank
                        `;
            await messages.sendMail(userMail, message, "Debit Bank Transfer Notification")
            return SuccessResponse(res, response)
           }

        } catch (error: any) {
            console.log(error)
            return BadRequestResponse(res, error.message);
        }
    }

    public verifyAccountDetails = async(req: Request, res: Response) =>{
        
        try {

            const {error} = transactionValidation.verifyAccountRequest(req.body);
            if(error) {
                const message ={ error: error.details[0].message }
                return BadRequestResponse(res, message); 
            }

            const response = await transactionService.verifyAccountDetails(req.body)
            return SuccessResponse(res, response)

        } catch (error: any) {

            return BadRequestResponse(res, error.message); 
        }

    }

    public banklist = async(req: Request, res: Response) =>{
        
        try {
            
            const response = await transactionService.bankList()
            return SuccessResponse(res, response)

        } catch (error: any) {

            return BadRequestResponse(res, error.message); 
        }

    }

    public transactionHistory = async (req: any, res: Response) => {

        try {
            const {page, count} = req.query;
            const pageNum = parseInt(page) || 1;
            const countPerPage = parseInt(count) || 10;
    
            const skip = (pageNum - 1) * countPerPage;
            
            const response = await transactionService.transactionHistory(req.userId, skip, pageNum, countPerPage)
            return SuccessResponse(res, response)
        } catch (error: any) {
            return ServerResponse(res, {message: error.message});
        }

    };
}

export const transactionController = new TransactionController();