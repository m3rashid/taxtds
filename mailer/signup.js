const nodemailer = require('./config/nodemailer');

module.exports = (comment) => {
    let html = nodemailer.renderTemplate({user: user}, '/mailer/signup.ejs');

    nodemailer.transporter.sendMail({
        from: process.env.GMAIL_ID,
        to: user.username,
        subject: 'Successfully signed up in taxtds',
        html: html
    }, (err, info) => {
        if(err){
            console.log(err);
            return;
        }
        console.log('Message sent', info);
        return; // Optional as this needs to run asynchronous
    })
}
