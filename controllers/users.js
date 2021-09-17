const User = require('../models/user');

// sign in and create a session for the user
module.exports.createSession = (req, res) => {
    return res.redirect('/');
}

module.exports.destroySession = (req, res) => {
    req.logout();
    return res.redirect('/');
}

module.exports.signup = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/user');
    }
    return res.send('<h1>User not authenticated</h1>');
}

module.exports.login = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/user');
    }
    return res.send('<h1>User not authenticated</h1>');
}

module.exports.getUser = (req, res) => {
    if(req.isAuthenticated()){
        return res.send('<h1>This is the users page</h1>');
    }
    return res.send('<h1>User not authenticated</h1>');
}

module.exports.create = (req, res) => {
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({username: req.body.username}, (err, user) => {
        if(err){
            console.log(err);
            return;
            }

        if (!user){
            User.create(req.body, (error, user) => {
                if(error){
                    console.log(error);
                    return;
                }

                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }

    });
}
