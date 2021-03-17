const Workout = require('../models/workout');
const Cardio = require('../models/cardio');
const Resistance = require('../models/resistance');

module.exports = (app) => {
    // get route used in getLastWorkout() in public/api.js.
    app.get('/api/workouts', async (req, res) => {
        Workout.find({}).populate('cardio').populate('resistance')
        .then(allWorkouts => {
            // Workaround becuase I don't understand virtuals properly and used them anyways.
            let workout = allWorkouts[allWorkouts.length - 1];
            workout["totalDuration"] = workout.totalDuration;
            console.log("a workout", workout);
            let lastWorkout= {workout};
            lastWorkout.totalDuration = workout.totalDuration;
            lastWorkout.exercises = workout.exercises;
            res.json(lastWorkout);
        });
        
    })

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
    // NOTE: Client-side code will add an empty exercise document on "complete" button click.
    app.put('/api/workouts', ({ body }, res) => {
        let workout_ID = body.id;
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

    // Response used by populateChart(data) in public/stats.js
    app.get('/api/workouts/range', async (req, res) => {
        // Gets last 7 workout objects. Mongo orders documents with latest entry last by default.
        let workoutDurations = [];
        let workoutTotalWeights = [];
        let exercises = [];
        let days = [];
        await Workout.find({}).populate('cardio').populate('resistance')
            .sort({ $natural: -1 }).limit(7)
            .then(lastSevenWorkouts => {
                for (let workout of lastSevenWorkouts) {
                    workoutDurations.push(workout.totalDuration);
                    workoutTotalWeights.push(workout.totalWeight);
                    exercises.push(...workout.exercises)
                    days.push(workout.date);
                }
            });

        // return de-duplicated array with JavaScript `Set` object
        let uniqueExercises = [...new Set(exercises)].filter(exercise => exercise !== "");
        res.json({ workoutDurations, workoutTotalWeights, uniqueExercises, days })

    })


}