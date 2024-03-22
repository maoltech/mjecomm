import speakeasy from 'speakeasy';
import { messages } from './message.service';

class TwoFA{

    public CreateTwoFA = async(userMail: string, secret: any ) => {

        const token = speakeasy.totp({
            secret: secret.ascii,
            encoding: 'base32'
        });

        const message = `Your OTP (One-Time Password) for verification is: ${token}`;

        messages.sendMail(userMail, message, 'OTP Verification')

    };

    public verify2FA = (twoFactorSecret: string, code: string) => {
        return speakeasy.totp.verify({
            secret: twoFactorSecret,
            encoding: 'base32',
            token: code
        });
    };
}

export const twoFA = new TwoFA();