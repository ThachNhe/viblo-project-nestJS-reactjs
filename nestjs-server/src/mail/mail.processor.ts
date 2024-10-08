import { Process, Processor } from '@nestjs/bull';
import { MailService } from './mail.service';
import { Job } from 'bull';

@Processor('mail')
export class MailProcessor {
  constructor(private readonly mailService: MailService) {}

  @Process()
  async handleMail(job: Job) {
    const { email, token } = job.data;
    await this.mailService.sendPasswordResetEmail(email, token);
  }
}
