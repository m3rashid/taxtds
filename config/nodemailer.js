const nodemailer = require('nodemailer');
const ejs = require('ejs');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    }
});

let renderTemplate = (data, path) => {
    let mailHTML;
    ejs.renderFile('../views/mailer/signup'), data, (err, template) => {
        if(err) {
            console.log(err);
            return;
        }
        mailHTML = template;
    }
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
};