const sendEmail = (to, subject, body, projectInfoPDF) => {
  console.log(
    `Sending email to ${to} with subject: ${subject} and body: ${body}`
  );
};

module.exports = {
  sendEmail,
};
