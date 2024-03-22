// import { JWT_TOKEN_SECRET,  JWT_REFRESHTOKEN_SECRET} from "../constants/environments";
import jwt from 'jsonwebtoken';
import { User } from "../model/user.model";

interface DecodedToken {
    userId: string;
    email: string;
  }
class JWTService{

    // private readonly secretKey: string;
    // private readonly refreshTokenSecret: string;

    constructor(){
        // this.secretKey = JWT_TOKEN_SECRET as string;
        // this.refreshTokenSecret = JWT_REFRESHTOKEN_SECRET as string;
    }

    public createToken = ( userId: String, email: String ) =>{

        const accessToken = jwt.sign({userId, email}, process.env.JWT_TOKEN_SECRET as string, { expiresIn: '10h' });
        const refreshToken = jwt.sign({userId, email}, process.env.JWT_REFRESHTOKEN_SECRET as string, { expiresIn: '7d' });
        return { accessToken, refreshToken };
                
    }

    public verifyAccessToken = async(token: string) => {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET as string) as DecodedToken;
        const user = await User.findById(decodedToken.userId);
        if(!user){
            return false
        }
        return user;

    }
}

export const jwtService = new JWTService();