import express from 'express';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { PrismaFeedbackRepository } from './repository/prisma/prisma-feedbacks-repository';
import { NodemailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedback', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodemailerMailAdapter = new NodemailerAdapter();

    const submitFeedbackService = new SubmitFeedbackService(prismaFeedbackRepository, nodemailerMailAdapter);

    const feedback = await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    }).then(feedback => { return feedback; }).catch(() => res.status(500).json({ message: "Error on FeedbackService" }));

    return res.status(201).json({ data: feedback });
});