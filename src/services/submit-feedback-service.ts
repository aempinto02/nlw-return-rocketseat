import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repository/feedback-repository";

interface SubmitFeedbackRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {

    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter,
    ) { }

    async execute(request: SubmitFeedbackRequest) {
        const { type, comment, screenshot } = request;

        // Se não houvesse inversão de dependência

        // const prismaFeedbackRepository = new PrismaFeedbackRepository();

        // await prismaFeedbackRepository.create({
        //     type,
        //     comment,
        //     screenshot,
        // });

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`
            ].join('\n')
        });

        const feedback = request;

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        });

        return feedback;
    }
}