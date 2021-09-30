const nodemailer = require('../config/nodemailer');

module.exports = (user) => {
    let html = nodemailer.renderTemplate(user, 'signup.ejs');
    let mailOptions = {
        from: '"Tax TDS admin", test.mega007@gmail.com',
        to: user.username,
        subject: 'Successfully signed up in taxtds',
        html: html
    };
    nodemailer.transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log('Error in sending mail', err);
            return;
        }
        console.log('Message sent', info);
        console.log(email)
        return; // Optional as this needs to run asynchronous
    })
}
