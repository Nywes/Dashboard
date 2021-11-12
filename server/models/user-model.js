const mongoose = require('mongoose')
const Schema = mongoose.Schema

// ! hash user password obviously
// ! md5 ? SHA-256 ?
// ! store the decryption key in your secrets / ENV
const User = new Schema(
    {
        name: { type: String, required: true, unique: true},
        password: { type: String, required: true },
        user_id: { type: Number, required: true, unique: true, dropDups: true }
    },
    //{ timestamps: true },
)

module.exports = mongoose.model('users', User)