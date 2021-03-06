const GoogleUser = require('../models/google-user-model')
const jwtCtrl = require('./jwt-controller')

const mongoose = require('mongoose');

// ! the schema inserts itself automatically
// ! mongoose.connection.useDb('myDB'); // Switching happens here..

createGoogleUser = (req, res) => {
    const body = req.body

    // * empty or no body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Unknown error',
        })
    }

    const user = new GoogleUser(body);

    // * if body provided is invalid
    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    // * add user to
    user
        .save()
        .then(() => {

            console.log("Got user, ", user);
            console.log("Sending username to jwt", user.userName);

            // * just send data here, createJWT looks for userName inside object
            var jwt = jwtCtrl.createJWT(user);

            console.log("Got JWT " + jwt);
            // * return jwt

            return res.status(200).json({
                success: true,
                id: user._id,
                token: jwt,
                message: 'GoogleUser created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'GoogleUser not created!',
            })
        })
}

connectGoogleUser = (req, res) => {
    var email = req.params.email;

    // * empty or no body
    if (!email) {
        return res.status(400).json({
            success: false,
            error: 'Provide email',
        })
    }

    var data = {userName: email};
    var jwt = jwtCtrl.createJWT(data);

    console.log("Got JWT " + jwt);
    // * return jwt

    return res.status(200).json({
        success: true,
        token: jwt,
        message: 'GoogleUser connected!',
    })

}

module.exports = {
    createGoogleUser,
    connectGoogleUser
}