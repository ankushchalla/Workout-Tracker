const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
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

WorkoutSchema.virtual('totalDuration')
    .get(function () {
        let totalDuration = 0;
        for (let cardio of this.cardio) {
            totalDuration += cardio.duration;
        }
        for (let resistance of this.resistance) {
            totalDuration += resistance.duration;
        }
        return totalDuration;
    });

WorkoutSchema.virtual('totalWeight')
    .get(function () {
        let totalWeight = 0;
        for (let resistance of this.resistance) {
            totalWeight += resistance.weight;
        }
        return totalWeight;
    })

WorkoutSchema.virtual('exercises')
    .get(function () {
        let exercises = [];
        for (let cardio of this.cardio) {
            exercises.push(cardio.name);
        }
        for (let resistance of this.resistance) {
            exercises.push(resistance.name);
        }
        return [...new Set(exercises)].filter(exercise => exercise !== "");
    })

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;