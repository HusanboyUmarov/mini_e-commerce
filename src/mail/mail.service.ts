import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Client } from '../client/model/client.model';


@Injectable()
export class MailService {
 constructor(
    readonly mailerService: MailerService,
 ){}

 async sendClinerConfirmation(client:Client):Promise<void>{
    const url = `${process.env.API_HOST}/api/client/activate/${client.activation_link}`;
    console.log(url)
    console.log(client.first_name, client.email)
    await this.mailerService.sendMail({
        to: client.email,
        subject: `Welcome to 'muddatli to'lov magazin' App, Confirm your Email!`,
        template: './confirmation', // Assuming you have a template named 'confirmation'
        context: {
            name: client.first_name,
            newUrl: url
        },
    });
 }
}
