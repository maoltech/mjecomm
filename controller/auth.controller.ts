import { Request, Response } from "express";
import { authValidation } from "../validation/auth.validation";
import { User } from "../model/user.model";
import { Temp } from "../model/temp.model";
import {BadRequestResponse, CreatedResponse, SuccessResponse} from "../constants/response"
import { userService } from "../service/user.service";
import { jwtService } from "../service/JWT.service";
import { messages } from "../service/message.service";
import { FRONTEND_URL } from "../constants/environments";
import { twoFA } from "../service/TwoFA.service";
import speakeasy from "speakeasy";

class AuthController{

    public SignUp = async(req: Request,res: Response) =>{

        const {error} = authValidation.signupAndSigninValidation(req.body)
        if (error) {
            const message ={ error: error.details[0].message }
            return BadRequestResponse(res, message);
        }
        const {email, username} = req.body;

        const existUser = await User.findOne({email: email.toLowerCase()})
        if(existUser){
            const message = "user already exists with this email"
            return BadRequestResponse(res,message)
        }

        const usernameExists = await User.findOne({username})
        if(usernameExists){
            const message = "user already exists with this username"
            return BadRequestResponse(res,message)
        }

        const user = await userService.createUser(req.body)

        const token = jwtService.createToken(user._id, user.email )

        const response = {
            userId: user._id,
            email: user.email,
            username: user.username,
            token: token.accessToken,
            refreshToken: token.refreshToken
            
        }

        return CreatedResponse(res, response)

    }

    public SignIn = async (req: Request, res: Response) => {

        const {error} = authValidation.signupAndSigninValidation(req.body)
        if (error) {
            const message ={ error: error.details[0].message }
            return BadRequestResponse(res, message);
        }

        const {email, password} = req.body;
        const user = await User.findOne({email: email.toLowerCase()})

        if (!user || !(await user.comparePassword(password))) {
            return BadRequestResponse(res, "Invalid email or password");
        }

        const token = jwtService.createToken(user._id, user.email)
        const response = {
            token: token.accessToken,
            refreshToken: token.refreshToken
        }

        if(user.twoFactorSecret){
            await twoFA.CreateTwoFA(user.email, user.twoFactorSecret );
        }
        

        return SuccessResponse(res, response)

    }

    public SendOtp = async(req: any, res: Response) => {

        const {error} = authValidation.phoneValidation(req.params)
        if (error) {
            const message ={ error: error.details[0].message }
            return BadRequestResponse(res, message);
        }

        const { userId } = req;
        const { phone } = req.params;
        const user = await User.findById(userId)
        if (!user || user.isPhoneVerified == true ) {
            const message = "User already Verfied or does not exist";
            return BadRequestResponse(res, message);
        }

        const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
        const tempData = {
            otp,
            phone,
            userId
        }
        console.log(tempData);
        await Temp.create(tempData);
        const mail = `Thank you for registering  on orrellFX your otp is ${otp}`;
        // await messages.sendOTPMessage(mail, phone)
        const data = 'OTP sent successfully'
        return SuccessResponse(res,{data, otp})

    }

    public VerifyOtp = async(req: any, res: Response) =>{
        const { phone, otp } = req.params
        const {userId} = req;
       
        const temp = await Temp.findOne({phone, otp})
        
        if(!temp){
            const message = "otp not verified"
            return BadRequestResponse(res,message)
        }
        const user = await User.findByIdAndUpdate(userId, {phone, isPhoneVerified: true})
        if(user){
            const data = "otp succesfully verified"
            return SuccessResponse(res, data)
        }
    }

    public SendEmail = async(req: any, res: Response) => {

        const { userMail, userId } = req;

        const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
        const tempData = {
            otp,
            userId,
            email: userMail
        }
        await Temp.create(tempData);
        const link = `${process.env.FRONTEND_URL as string}verifymail/?email=${userMail}&otp=${otp}`
        const mail = `Thank you for registering  on orrellFX your otp is ${otp}, link: ${link}`;
        const subject = 'Verification-Mail'
        await messages.sendMail(mail, userMail,subject)
        const data = 'OTP sent successfully'
        return SuccessResponse(res,{data, link})

    }

    public VerifyMail = async(req: any, res: Response) =>{
        const { email, otp } = req.params;  
        
        const temp = await Temp.findOne({email, otp})
        
        if(!temp){
            const message = "otp not verified"
            return BadRequestResponse(res,message)
        }
        const user = await User.findOneAndUpdate({email}, { isEmailVerified: true})
        if(!user){
            const message = "user not found"
            return BadRequestResponse(res, message)
        }
        const token = jwtService.createToken(user._id, user.email )
        if(user){
            const data = {message: "otp succesfully verified", token}
            return SuccessResponse(res, data)
        }
    }

    
}

export const authController = new AuthController();