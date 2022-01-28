import nodeMailer from "nodemailer";
import {
  SMTP_MAIL,
  SMTP_SERVICE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_PASS,
} from "../config";

const sendEmail = async (options) => {
  //   const accessToken = await OAuth2Client.getAccessToken();
  try {
    const transporter = nodeMailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      service: SMTP_SERVICE,
      secure: false,
      requireTLS: true,
      auth: {
        user: SMTP_MAIL,
        pass: SMTP_PASS,
      },
    });
    const mailOptions = {
      from: SMTP_MAIL,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return new ErrorHandler(error.message, 500);
  }

  //   res.status(200).json({ success: true, message: "mail send successfully" });
};
export default sendEmail;
