const server = require('express').Router();
const inqueue = require('../controllers/inQueue');

server.get('/', (req, res, next) => {
    inqueue.read()
        .then(r => res.send(r))
        .catch(next);
})

server.post('/', (req, res, next) => {
    const { title, description } = req.body
    if (!title) {
        return res.status(400).send('You need a title')
    }
    inqueue.create(title, description)
        .then(r => res.send(r))
        .catch(next);
})

module.exports = server