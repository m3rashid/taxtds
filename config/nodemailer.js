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
    tls: { rejectUnauthorized: false }
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

module.exports = (user, template, subject) => { // other data to be passed inside the 'user'
    let html = renderTemplate(user, template);
    let mailOptions = {
        from: `"Tax TDS admin", ${process.env.GMAIL_USERNAME}@gmail.com`,
        to: user.username,
        subject: subject,
        html: html
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return; // Optional as this needs to run asynchronous
    })
}

