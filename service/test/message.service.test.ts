const {messages} = require('../message.service');


jest.mock('axios');
const axios = require('axios');
describe('Messages', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendOTPMessage', () => {
    it('should send OTP message successfully', async () => {
      const mockResponse = { data: 'Success' };
      jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);

      const phone = '1234567890';
      const message = 'Your OTP is 123456';
      await messages.sendOTPMessage(message, phone);

      expect(axios.post).toHaveBeenCalledWith(
        'https://termii.com/api/sms/send',
        {
          to: phone,
          from: expect.any(String),
          sms: message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Api-Key': expect.any(String),
          },
        }
      );
      expect(console.log).toHaveBeenCalledWith(mockResponse.data);
    });

    it('should handle error when sending OTP message fails', async () => {
      const mockError = new Error('Failed to send OTP');
      jest.spyOn(axios, 'post').mockResolvedValueOnce(mockError);;

      const phone = '1234567890';
      const message = 'Your OTP is 123456';
      await messages.sendOTPMessage(message, phone);

      expect(axios.post).toHaveBeenCalledWith(
        'https://termii.com/api/sms/send',
        expect.any(Object),
        expect.any(Object)
      );
      expect(console.error).toHaveBeenCalledWith(
        'Error sending OTP via Termii:',
        mockError.message
      );
    });
  });

  describe('sendMail', () => {
    it('should send mail successfully', async () => {
      const mockResponse = { data: 'Success' };
      jest.spyOn(axios, 'post').mockResolvedValueOnce(mockResponse);
      const mail = 'recipient@example.com';
      const message = 'Hello, this is a test email';
      const subject = 'Test Email';
      const result = await messages.sendMail(mail, message, subject);

      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        {
          from: expect.any(String),
          to: mail,
          subject: subject,
          text: message,
        },
        expect.any(Object)
      );
      expect(console.log).toHaveBeenCalledWith(mockResponse.data);
      expect(result).toEqual(mockResponse.data);
    });

    it('should handle error when sending mail fails', async () => {
      const mockError = new Error('Failed to send mail');
      jest.spyOn(axios, 'post').mockResolvedValueOnce(mockError);;

      const mail = 'recipient@example.com';
      const message = 'Hello, this is a test email';
      const subject = 'Test Email';
      await messages.sendMail(mail, message, subject);

      expect(axios.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.any(Object)
      );
      expect(console.error).toHaveBeenCalledWith(
        'Error sending mail via Mailgun:',
        mockError.message
      );
    });
  });
});
