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
    app.put('/api/workouts', ({body}, res) => {
        let workout_ID = body.id;

        // Next step: Push new info to workout document with above workout_id.

        console.log("workout id:", workout_ID);
        /*if (body.type === 'cardio') {
            Cardio.create(body).then(dbWorkouts => {
                res.json(dbWorkouts);
            }).catch(error => {
                res.json(error);
            });
        }
        else {
            Resistance.create(body).then(dbWorkouts => {
                res.json(dbWorkouts);
            }).catch(error => {
                res.json(error);
            });
        }*/

    });


}