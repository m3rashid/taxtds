const multer = require('multer');
const fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, file, done) => {
        done(null, 'uploads')
    },
    filename: (req, file, done) => {
        let ext = file.originalname.substr(file.originalname.lastIndexOf('.'));     // gives the extension of the file
        done(null, file.fieldname + '-' + Date.now() + ext);
    }
})

module.exports = upload = multer({storage: storage});