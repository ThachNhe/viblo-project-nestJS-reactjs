import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('mail')
export class MailProcessor {
  constructor(private mailerService: MailerService) {}

  @Process()
  async handleMail(job: Job) {
    const { mailOptions } = job.data;
    await this.mailerService.sendMail(mailOptions);
  }
}
