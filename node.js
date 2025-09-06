// Import necessary libraries
const express = require('express');  
const nodemailer = require('nodemailer'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const app = express(); 
const port = 3000; 

// Use CORS to allow cross-origin requests from different domains
app.use(cors());
// Use body-parser to parse incoming JSON payload in requests
app.use(bodyParser.json());

// Create a nodemailer transporter object for sending emails via Gmail's SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'    
  }
});

// Define an endpoint for sending emails (POST request)
app.post('/send-email', (req, res) => {
  // Extract the data from the incoming request body (to_email, subject, message)
  const { to_email, subject, message } = req.body;

  // Set up the email options, including sender, recipient, subject, and content
  const mailOptions = {
    from: 'your-email@gmail.com', 
    to: to_email,                
    subject: subject,            
    html: message                
  };

  // Send the email using the transporter object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // If there's an error, return a 500 status with the error message
      return res.status(500).json({ success: false, message: error });
    }
    // If email is sent successfully, return a success response with the info
    res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
  });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`); 
});
