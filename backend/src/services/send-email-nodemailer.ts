import nodemailer from "nodemailer"
import { EmailTemplate } from "./email-otp-verification-template";

export async function sendEmail(emailTemplate: EmailTemplate) {
    if (!process.env.SMTP_HOST) {
        console.log(`[OTP] send to ${emailTemplate.toEmail}: ${emailTemplate}`);
        return;
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: emailTemplate.toEmail,
        subject: emailTemplate.subject,
        text: emailTemplate.text,
        html: emailTemplate.html,
    });

    console.log("OTP email sent:", info.messageId);
}
