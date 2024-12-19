import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(private readonly emailService: MailerService) {}

  async sendActivedOtp(to: string, subject: string, text: string, id: number) {
    try {
      await this.emailService.sendMail({
        to,
        subject,
        html: `
            <h1>
              This is your otp: ${text}
              Your id: ${id}
            </h1>
        `,
      });
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
