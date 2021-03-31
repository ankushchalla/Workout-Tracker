const mongoose = require("mongoose");
const Schema = mongoose.Schema
const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        // Workaround so Mongoose knows exercises[i].type is a String.
        // See https://mongoosejs.com/docs/schematypes.html#type-key
        type: {
            type: String
        }, 
        name: String, 
        duration: Number,
        distance: {
            type: Number,
            default: null
        },
        weight: {
            type: Number,
            default: null
        },
        reps: {
            type: Number,
            default: null
        },
        sets: {
            type: Number,
            default: null
        },

    }]
})

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;