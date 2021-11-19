const User = require('../models/user-model')
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

    const user = new User(body);

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
                message: 'User created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'User not created!',
            })
        })
}

// * Update User region
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
            //     User.findOne({ user_id: req.params.id }, (err, movie) => {
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
    await User.findOneAndDelete({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

// todo make a getUserByName, can it be the same function but with different params ?

getUserByName = async (req, res) => {
    await User.distinct('userName', { userName: {$eq: req.params.userName} }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err));
}

getUserById = async (req, res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err));
}

getUsers = async (req, res) => {
    await User.find({}, (err, users) => {
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
    getUserByName
}