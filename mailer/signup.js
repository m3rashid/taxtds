const nodemailer = require('../config/nodemailer');

module.exports = () => {
    let html = nodemailer.renderTemplate(/*{data: 'MD Rashid Hussain'},*/ 'signup.ejs');

    nodemailer.transporter.sendMail({
        from: 'Sam Billings',
        to: 'coold1741@gmail.com',
        subject: 'Successfully signed up in taxtds',
        html: html
    }, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        return; // Optional as this needs to run asynchronous
    })
}
