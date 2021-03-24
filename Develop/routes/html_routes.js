const path = require('path');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: path.join('Develop', 'public')});
    })
    app.get('/exercise', (req, res) => {
        res.sendFile('exercise.html', { root: path.join('Develop', 'public')});
    })
    app.get('/stats', (req, res) => {
        res.sendFile('stats.html', { root: path.join('Develop', 'public')});
    })
}
