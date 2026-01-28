import nodemailer from 'nodemailer';

export const Transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: "achraf0el7azzouzi@gmail.com",
        pass: "ydoddaxvxmdwddhp",
    }
});
