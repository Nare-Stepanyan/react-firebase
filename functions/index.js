const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

//env vars

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

// create node mailer transport

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: { user: gmailEmail, pass: gmailPassword },
});

async function sendWelcomeEmail(email) {
  const mailOptions = {
    from: "Developer Account <develaccoun@gmail.com>",
    to: email,
    subject: `Welcome to the FindMe!`,
    text: `Hey ${email}! Welcome to the FindMe, the team of developers`,
  };

  await mailTransport.sendMail(mailOptions);

  console.log("new welcome email sent to:", email);

  return null;
}

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  return sendWelcomeEmail(email);
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
