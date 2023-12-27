const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    tedId: {
        type: Schema.Types.ObjectId,
        ref: "ted"
    },
    date: {
        type: Date,
        default: Date.now
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})


module.exports = mongoose.model("Review", reviewSchema);