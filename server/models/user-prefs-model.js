const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserPrefs = new Schema(
    {
        userName: { type: String, required: true, unique: true},
        widgetNames: { type: [String], required: true },
        widgetInfo: { type: [String], required: true },
        widgetIndexes: { type: [Number], required: true },
        columnIndexes: { type: [Number], required: true },
    },
    {
        collection: "userPrefs",
    },
)
module.exports = mongoose.model('userPrefs', UserPrefs)