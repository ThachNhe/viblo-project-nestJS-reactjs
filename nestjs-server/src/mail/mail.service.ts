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

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `http://localhost:3000/reset-password/${token}`;

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Email</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px;
            text-align: center;
        }
        .header {
            background: #E1F5FE;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            color: #2196F3;
        }
        .content {
            margin: 20px 0;
            text-align: left;
        }
        .button {
            background-color: #2196F3;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
            margin: 10px 0;
        }
        .footer {
            font-size: 0.9em;
            color: #666;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>VIBLO</h1>
            <p>Free service for technical knowledge sharing</p>
        </div>
        <div class="content">
            <h2>Hello!</h2>
            <p>Viblo Platform system has just received your password reset request. If that is you, confirm the password reset here.</p>
            <p>http://localhost:3000/reset-password/${token}</p>
            <p>If not you, please ignore this email. Thank you!</p>
        </div>
        <div class="footer">
            <p>© 2024 VIBLO. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
    const mailOptions = {
      from: this.configService.get('EMAIL_USER'),
      to: email,
      subject: 'Reset Password',
      text: `Click the link below to reset your password: ${resetUrl}`,
      html: `<html><body>${htmlContent}</body></html>`,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
