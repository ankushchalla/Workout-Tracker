const Workout = require('../models/workout');
const Cardio = require('../models/cardio');
const Resistance = require('../models/resistance');

// const db = require('../models');

module.exports = (app) => {
    // Create a new empty document representing a workout in the Workouts collection.
    // This document will be filled after user fills form.
    app.post('/api/workouts', (req, res) => {
        Workout.create({}).then(dbWorkouts => {
            res.json(dbWorkouts)
        }).catch(error => {
            res.json(error);
        })
    });

    // body contains data that will be put into a new cardio/resistance document.
    // .create(body) works because body's keys match with that of each document in the Cardios/Resistances collection.
    app.put('/api/workouts', ({ body }, res) => {
        let workout_ID = body.id;

        // Next step: Push new info to workout document with above workout_id.
        if (body.type === 'cardio') {
            Cardio.create(body)
                // findOneAndUpdate returns the updated doc: In this case, the updated Workout doc.
                // The returned Workout doc gets sent in the response: res.json(dbWorkouts).
                .then(cardioDocument => Workout.findOneAndUpdate({ _id: workout_ID },
                    { $push: { cardio: cardioDocument._id } }, { new: true }))
                .then(dbWorkouts => {
                    res.json(dbWorkouts);
                }).catch(error => {
                    res.json(error);
                });
        }
        else {
            Resistance.create(body)
                .then(resistanceDocument => Workout.findOneAndUpdate({ _id: workout_ID },
                    { $push: { resistance: resistanceDocument._id } }, { new: true }))
                .then(dbWorkouts => {
                    res.json(dbWorkouts);
                }).catch(error => {
                    res.json(error);
                });
        }

    });


}