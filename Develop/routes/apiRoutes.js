const Cardio = require('../models/cardioModel');

module.exports = (app) => {
    app.put('/api/workouts', ({body}, res) => {
        console.log(body.type);
        if (body.type === 'cardio') {
            console.log("inside if");
            Cardio.create(body).then(dbWorkouts => {
                console.log("response:", dbWorkouts);
                res.json(dbWorkouts);
            }).catch(error => {
                res.json(error);
            });

        }
    })
}