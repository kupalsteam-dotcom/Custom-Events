const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Use CORS and body-parser for handling requests
app.use(cors());
app.use(bodyParser.json());

// Create a transporter object using Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail address
    pass: 'your-email-password'    // Replace with your Gmail password or app password
  }
});

// Endpoint to handle sending email
app.post('/send-email', (req, res) => {
  const { to_email, subject, message } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com',
    to: to_email,
    subject: subject,
    html: message // Using HTML format to allow rich-text letters
  };

  // Send email using nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: error });
    }
    res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
