import { INotificationsManager, SystemAccountConfig, TYPES } from '@backend/types';
import { inject, injectable } from 'inversify';
import nodemailer from 'nodemailer';

export type EmailNotification = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

@injectable()
export class NotificationsManager implements INotificationsManager {
  transporter: nodemailer.Transporter;
  constructor(
    @inject(TYPES.systemAccountConfig) readonly config: SystemAccountConfig
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.email,
        pass: config.password,
      },
    });
  }
  async sendMail(notification: EmailNotification) {
    return this.transporter.sendMail({
      from: `"Reeliv" ${this.config.email}`,
      ...notification,
    });
  }
}
