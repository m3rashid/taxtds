const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

let renderTemplate = (data, filename) => {
    let mailHTML;
    ejs.renderFile(path.join(__dirname, `../views/mailer/${filename}`), {data: data}, (err, template) => {
        if(err) {
            console.log('Error in rendering template', err);
            return;
        }
        mailHTML = template;
    });
    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
};