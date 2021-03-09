const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const workoutSchema = new Schema({
    // Other unique workout data here...
    cardio: [
        {
            type: Schema.Types.ObjectId,
            ref: "Cardio"
        }
    ],
    resistance: [
        {
            type: Schema.Types.ObjectId,
            ref: "Resistance"
        }
    ]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;