/**
  TODO:
  - Add support for multiple recipients
  - Add support for attachments
  - Add support for HTML emails
  - Add support for templates
  - Add support for custom headers
  - Add support for custom content
  - Add support for custom templates
  - see: https://nodemailer.com/smtp-transport/
  - send email through mailgun

 */

import { SendEmailDto } from "@dtos/email.dto";
import { HttpException } from "@exceptions/HttpException";
import { isEmpty } from "@utils/util";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host:'hostname',
  port: 587,
  secure:false,
  requireTLS:true,
  auth: {
    user: "",
    pass: "",
  }
});

async function sendEmail(data: SendEmailDto) {
  if (isEmpty(data.message)) {
    throw new HttpException( 400, 'Your message is empty');
  };

transporter.sendMail(data.message, (error, info) => {
  if (error) {
    console.log(error);
  }
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});
};
