import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private mailQueue: Queue) {}

  async sendPasswordResetEmail(email: string, token: string) {
    const url = `http://localhost:3000/reset-password/${token}`;
    const mailOptions = {
      from: 'test@mailpit',
      to: 'recipient@mailpit',
      subject: 'Reset Password',
      template: './Password',
      context: {
        name: 'John Doe',
        url,
      },
    };

    await this.mailQueue.add({ mailOptions });
  }
}
