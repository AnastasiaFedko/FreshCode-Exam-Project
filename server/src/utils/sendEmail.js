const CONSTANTS = require('../constants');
const nodemailer = require('nodemailer');
const ServerError = require('../errors/ServerError');

const transport = nodemailer.createTransport({
  auth: {
    user: CONSTANTS.EMAIL,
    pass: CONSTANTS.EMAIL_PASSWORD,
  },
  host: CONSTANTS.EMAIL_HOST,
  port: CONSTANTS.EMAIL_PORT,
  secure: true,
});

module.exports.forgotPasswordMail = async (token, email, fullName) => {

  const emailTemplate = `
      <h3>Hello, ${fullName}!</h3>
      <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process: </p>
      <a href="${CONSTANTS.EMAIL_PATH}?${token}">Click here</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

  const mailOptions = {
    to: email,
    from: CONSTANTS.EMAIL_EMAIL,
    subject: 'Squad Help Password Reset',
    html: emailTemplate,
  };

  transport.sendMail(mailOptions, (error) => {
    console.log(error.message);
    throw new ServerError('cannot send email');
  });
};

module.exports.changeOfferStatusMail = async (email, fullName, text, originalFileName, decision) => {

  const emailTemplate = `
      <h3>Hello, ${fullName}!</h3>
      <p>Your offer ${text ? text : originalFileName} was ${decision} by the administrator.</p>`;

  const mailOptions = {
    to: email,
    from: CONSTANTS.EMAIL,
    subject: 'Squad Help Change Offer Status',
    html: emailTemplate,
  };

  transport.sendMail(mailOptions, (error) => {
    console.log(error.message);
    throw new ServerError('cannot send email');
  });
};
