const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BaseUser = new Schema(
    {
        displayName: {type: String, required: true},
        userName: { type: String, required: true, unique: true},
    },
    {
        collection: "users",
        discriminatorKey: "loginType"
    },
)
module.exports = mongoose.model('users', BaseUser)