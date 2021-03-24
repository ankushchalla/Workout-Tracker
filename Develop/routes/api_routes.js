const Workout = require('../models/Workout')

module.exports = (app) => {
    app.get('/api/workouts', async (req, res) => {
        let allWorkouts = await Workout
            .aggregate([
                {
                    $addFields: {
                        totalDuration: { $sum: "$exercises.duration" },
                        totalWeight: { $sum: "$exercises.weight" }
                    }
                }
            ])
        res.json(allWorkouts);
    })

    // Creates a new workout mongodb object, in which exercises will be added. 
    app.post('/api/workouts', async (req, res) => {
        let newWorkout = await Workout.create({});
        res.json(newWorkout);
    })

    // Adds a new exercise to a workout that corresponds to a given workoutID.
    app.put('/api/workouts/:workoutID', async (req, res) => {
        let workoutData = req.body;

        let currentWorkout = await Workout.findOneAndUpdate({ _id: req.params.workoutID },
            { $push: { exercises: workoutData } },
            { new: true });
        res.json(currentWorkout);
    })

    app.get('/api/workouts/range', async (req, res) => {
        let lastSevenWorkouts = await Workout
            .aggregate([
                {
                    $addFields: {
                        totalDuration: { $sum: "$exercises.duration" },
                        totalWeight: { $sum: "$exercises.weight" }
                    }
                }
            ])
            .sort({ 'day': -1 })
            .limit(7)

        res.json(lastSevenWorkouts);
    })
}