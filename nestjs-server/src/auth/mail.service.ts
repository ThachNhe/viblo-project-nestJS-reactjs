import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: any;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: configService.get('EMAIL_USER'),
        pass: configService.get('EMAIL_PASSWORD'),
      },
    });
  }

  async sendResetPasswordMail(email: string, token: string) {
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'Reset Password',
      text: `Click the link below to reset your password: ${resetUrl}`,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
