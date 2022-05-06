import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "6236f5655ba29d",
        pass: "73caf1a0ca3798"
    }
});

export class NodemailerAdapter implements MailAdapter {

    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'André Pinto <aempinto02@gmail.com>',
            subject,
            html: body,
        });
    }
}