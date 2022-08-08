process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_MESSAGING_SERVICE_SID, TWILIO_VERIFY_SERVICE_SID } from '@/config';
import { sendIdDto } from '@/dtos/sms.dto';
import twilio, { Twilio } from 'twilio';

export const client: Twilio = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export function VerifyUser(phoneNumber: string): Promise<any> {
  return new Promise((resolve, reject) => {
    client.verify
      .services(TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
      .then(verification => {
        resolve(verification);
      })
      .catch(err => {
        reject(err);
      });
  });
}

// send sms to user
export function SendSMS(data: sendIdDto) {
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        body: `Welcome To TutisID.\nYour Tutis-ID Identity Number is: ${data.identityNumber}\nPlease use this number to login to your account.\nDo Not Share Any Of Your Pins With Anyone.\n\nThanks,\nTutisID`,
        // from: process.env.TWILIO_PHONE_NUMBER,
        messagingServiceSid: TWILIO_MESSAGING_SERVICE_SID,
        to: data.phoneNumber,
      })
      .then(message => {
        resolve(message);
        // console.log(message);
      })
      .catch(err => {
        reject(err);
        // console.log(err);
      });
  });
}
