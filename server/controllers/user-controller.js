const BaseUser = require('../models/base-user-model')
const LoggedUser = require('../models/logged-user-model')
const jwtCtrl = require('./jwt-controller')

const mongoose = require('mongoose');

// ! the schema inserts itself automatically
// ! mongoose.connection.useDb('myDB'); // Switching happens here..

createUser = (req, res) => {
    const body = req.body

    // * empty or no body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user',
        })
    }

    const user = new LoggedUser(body);

    // * if body provided is invalid
    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    // * add user to
    user
        .save()
        .then(() => {
            return res.status(200).json({
                success: true,
                id: user._id,
                message: 'LoggedUser created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'LoggedUser not created!',
            })
        })
}

// * Update LoggedUser region
//#region UpdateUser
// updateMovie = async (req, res) => {
    //     const body = req.body
    
    //     // * no body provided:
    //     if (!body) {
        //         return res.status(400).json({
            //             success: false,
            //             error: 'You must provide a body to update',
            //         })
            //     }
            
            //     // ! find based on our user_id
            //     LoggedUser.findOne({ user_id: req.params.id }, (err, movie) => {
                //         if (err) {
                    //             return res.status(404).json({
                        //                 err,
                        //                 message: 'Movie not found!',
                        //             })
                        //         }
                        //         movie.name = body.name
                        //         movie.time = body.time
                        //         movie.rating = body.rating
                        //         movie
                        //             .save()
                        //             .then(() => {
                            //                 return res.status(200).json({
                                //                     success: true,
                                //                     id: movie._id,
                                //                     message: 'Movie updated!',
                                //                 })
                                //             })
                                //             .catch(error => {
                                    //                 return res.status(404).json({
                                        //                     error,
                                        //                     message: 'Movie not updated!',
                                        //                 })
                                        //             })
                                        //     })
                                        // }
//#endregion

deleteUser = async (req, res) => {
    await LoggedUser.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `LoggedUser not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

authenticateUser = async(req, res) => {

    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide user credentials',
        });
    }

    // * find by name
    //await LoggedUser.distinct('userName', { userName: {$eq: body.userName} }, async (err, user) => {
    await LoggedUser.find({ userName: body.userName }, async (err, user) => {

        if (err) {
            console.log(err);
            return res.status(400).json({ success: false, error: err })
        }

        if (!user || user.length == 0) {
            console.log("LoggedUser not found");

            return res
                .status(404)
                .json({ success: false, error: `LoggedUser not found` })
        }

        var matchedPassword = false;
        console.log("Result in user.distinct: ");
        console.log(user);

        // * decrypt password
        await LoggedUser.comparePassword(user[0].password, body.password, (err, isMatch) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            } else {
                matchedPassword = isMatch;
            }
        });

        console.log("Password correct ? = " + matchedPassword);

        if (!matchedPassword) {
            console.log("Password is wrong");
            return (res.status(401).json({success: false, error: "Password is incorrect"}));
        }

        // * create token
        // ! beware await, return a promise
        var jwt = jwtCtrl.createJWT(user[0]);

        console.log("Got JWT " + jwt);
        // * return jwt
        return res.status(200).json({ success: true, data: user[0], token: jwt })
    })
    .catch(err => console.log(err));
}

getUserByName = async (req, res) => {
    await BaseUser.find({ userName: req.params.userName }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user || user.length === 0) {
            return res
                .status(404)
                .json({ success: false, error: `BaseUser not found` })
        }

        return res.status(200).json({ success: true, data: user })
    })
    .catch(err => console.log(err));
}

getUserById = async (req, res) => {
    await LoggedUser.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `LoggedUser not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err));
}

getUsers = async (req, res) => {
    await BaseUser.find({}, (err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `Users not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}

module.exports = {
    createUser,
    deleteUser,
    getUsers,
    getUserById,
    getUserByName,
    authenticateUser
}