const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

class MailController {
  async sendMail(req, res, next) {
    const { toUser, fromUser, email } = req.body;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.GMAIL_USER_NAME,
        pass: process.env.GMAIL_USER_PASSWORD,
      },
    });

    const mailOptions = {
      from: "Adireto Challenge - Sorteio de amigo secreto",
      to: email,
      subject: "Sorteio do amigo secreto.",
      text: "",
      html: `
      <h1>Olá ${fromUser}, seu amigo secreto é: ${toUser}.</h1>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(501).json({ message: error });
      } else {
        return res.json({ message: `Email sent ${info.response}` });
      }
    });
  }
}

module.exports = new MailController();
