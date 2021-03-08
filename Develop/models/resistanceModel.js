const mongoose = require("mongoose");

const ResistanceSchema = new mongoose.Schema({
    name: {
        type: String, 
        trim: true
    },
    weight: Number,
    sets: Number,
    reps: Number,
    duration: Number,
    type: String
});

const Resistance = mongoose.model("Resistance", ResistanceSchema);

module.exports = Resistance;