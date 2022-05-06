import { prisma } from "../../prisma";
import { FeedbackCreateData, FeedbackRepository } from "../feedback-repository";

export class PrismaFeedbackRepository implements FeedbackRepository {
    async create({ type, comment, screenshot }: FeedbackCreateData) {
        const teste = await prisma.feedback.create({
            data: {
                type,
                comment,
                screenshot,
            }
        }).then(feedback => { return feedback; }).catch(error => console.log(error));
        console.log("HEY there!" + teste);
    }
}
