import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from './mail.service';
import { MailProcessor } from './mail.processor';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: 'mail',
    }),

    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        secure: false,
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: join(__dirname, 'mail/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService, MailProcessor],
  exports: [MailService],
})
export class MailModule {}
