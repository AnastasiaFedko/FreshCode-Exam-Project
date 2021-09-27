const CONSTANTS = require('../constants');
const nodemailer = require('nodemailer');
const ServerError = require('../errors/ServerError');

module.exports.sendEmail = async (token, email, fullName) => {

  const transport = nodemailer.createTransport({
    auth: {
      user: CONSTANTS.RECOVER_EMAIL,
      pass: CONSTANTS.RECOVER_PASSWORD,
    },
    host: CONSTANTS.RECOVER_HOST,
    port: CONSTANTS.RECOVER_PORT,
    secure: true,
  });

  const emailTemplate = `
      <h3>Hello, ${fullName}!</h3>
      <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process: </p>
      <a href="${CONSTANTS.RECOVER_PATH}?${token}">Click here</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

  const mailOptions = {
    to: email,
    from: CONSTANTS.RECOVER_EMAIL,
    subject: 'Squad Help Password Reset',
    html: emailTemplate,
  };

  transport.sendMail(mailOptions, (error) => {
    console.log(error.message);
    throw new ServerError('cannot send email');
  });
};
