const Flutterwave = require("flutterwave-node-v3");
import { Wallet } from "../model/wallet.model";


class WalletService {

    public createAccount = async(email: string, bvn: string, userId: string) =>{

        const details = {
            email,
            bvn,
            is_permanent: true
        };
        try {
            
            const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY as string, process.env.FLW_SECRET_KEY as string);
            const accResponse = await flw.VirtualAcct.create(details)
           
            const {data, status, message} = accResponse
            if(status === "success" && message === "Virtual account created"){
                const {account_name, account_number, order_ref, bank_name } = data

                const newWallet = new Wallet({
                    account_number,
                    bank_name,
                    order_ref,
                    userId,
                    email
                })
                return await newWallet.save()
            }

        } catch (error: any) {
            console.log(error)
            console.log(error.message);
        }
        
    }


}

export const walletService = new WalletService();