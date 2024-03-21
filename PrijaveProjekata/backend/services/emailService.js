const sendEmail = (to, subject, body) => {
    console.log(`Sending email to ${to} with subject: ${subject} and body: ${body}`);
}

module.exports = {
    sendEmail
}