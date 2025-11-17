export interface EmailTemplate {
    toEmail: string;
    subject: string;
    text: string;
    html: string;
}

export const emailOtpVerficationTemplate = (otp: String, toEmail: string): EmailTemplate => {
    return {
        toEmail: toEmail,
        subject: "Your Email verification code",
        text: `Your verification code is ${otp}. It will expire in 10 minutes.`,
        html: `<p>Your verification code is <b>${otp}</b>. It will expire in 10 minutes.</p>`
    }

}