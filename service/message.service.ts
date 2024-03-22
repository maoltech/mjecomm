import axios from 'axios';
import { TERMI_API_KEY, MAILGUN_API_KEY, MAILGUN_DOMAIN, TERMI_SENDER_ID, SENDER_EMAIL, MAILGUN_API_URL } from '../constants/environments'

class Messages {

    constructor() {

    }

    public sendOTPMessage = async (message: string, phone: string) => {
        try {
            const termiiResponse = await axios.post(
                'https://termii.com/api/sms/send',
                {
                    to: phone,
                    from: process.env.TERMI_SENDER_ID as string,
                    sms: message,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Api-Key': process.env.TERMI_API_KEY as string
                    },
                }
            );
            console.log(termiiResponse.data);
        } catch (error: any) {
            console.error('Error sending OTP via Termii:', error.message);
        }
    };

    public sendMail = async (mail: string, message: string, subject: string) => {
        try {
            
            const mailgunResponse = await axios.post(
                `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN as string}/messages`,
                {
                    from: process.env.SENDER_EMAIL as string,
                    to: mail,
                    subject: subject,
                    text: message,
                },
                {
                    auth: {
                        username: 'api',
                        password: process.env.MAILGUN_API_KEY as string,
                    },
                }
            );
            console.log(mailgunResponse.data);
            return mailgunResponse.data;


        } catch (error: any) {
            console.log(error);
            console.error('Error sending mail via Mailgun:', error.message);
        }
    };
}


export const messages = new Messages();