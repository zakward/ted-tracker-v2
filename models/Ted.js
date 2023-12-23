const mongoose = require("mongoose")
const Schema = mongoose.Schema

const tedSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dispensaryPurchased: {
        type: String
    },
    grower: {
        type: String
    },
    thc: {
        type: Number
    },
    cbd: {
        type: Number
    },
    harvestDate: {
        type: Date
    },
    category: {
        type: String,
        enum: ["flower", "gummy", "edible"]
    },
    type: {
        type: String,
        enum: ["indica", "sativa", 'hybrid']
    },
    stars: {
        type: Number,
        min: 1,
        max: 5
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
    
})


module.exports = mongoose.model("ted", tedSchema)
