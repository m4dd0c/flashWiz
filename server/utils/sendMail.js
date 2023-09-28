import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, body) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  return (await transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: body,
  }))
    ? true
    : false;
};
