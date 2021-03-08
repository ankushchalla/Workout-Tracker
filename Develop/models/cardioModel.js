const mongoose = require("mongoose");

const CardioSchema = new mongoose.Schema({
    distance: {
        type: Number,
    },
    duration: {
        type: Number,
    },
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String
    }
})

const Cardio = mongoose.model("Cardio", CardioSchema);

module.exports = Cardio;