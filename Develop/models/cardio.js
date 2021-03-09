const mongoose = require("mongoose");

const CardioSchema = new mongoose.Schema({
    distance: Number,
    duration: Number,
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    }
})

const Cardio = mongoose.model("Cardio", CardioSchema);

module.exports = Cardio;