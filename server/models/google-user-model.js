const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const baseUserModel = require('./base-user-model')

const GoogleUser = new Schema(
    {
    },
    {
        collection: "users",
        discriminatorKey: "loginType"
    }
)

module.exports = baseUserModel.discriminator('googleUser', GoogleUser)