const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email", (req, res) => {
  const { name, email, phone, inquiry } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "contact@cvtransportsolutions.com",
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone || "Not provided"}
      Inquiry: ${inquiry}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
