const Cardio = require('../models/cardioModel');
const Resistance = require('../models/resistanceModel');

// const db = require('../models');

module.exports = (app) => {
    app.put('/api/workouts', ({body}, res) => {
        console.log("body:", body);
        if (body.type === 'cardio') {
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
        }

    })
}