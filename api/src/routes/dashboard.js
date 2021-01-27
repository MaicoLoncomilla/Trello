const server = require('express').Router();
const dashboard = require('../controllers/dashboard');

server.get('/:email', (req, res, next) => {
    const { email } = req.params;
    if (!email) {
        return res.status(400).send('You need an Email!')
    }
    dashboard.read(email)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/', (req, res, next) => {
    const { id, title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('You need a title and description to create a new dashboard')
    }
    dashboard.create(id, title, description)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', (req, res, next) => {
    const { id, title, description } = req.body;
    if (!title || !description) {
        return res.status(400).send('You need an Title and description to modify Dashboard')
    }
    dashboard.modify(id, title, description)
        .then(r => res.send(r))
        .catch(next)
})

server.delete('/', (req, res, next) => {
    const { id } = req.body;
    dashboard.delete(id)
        .then(r => res.send(r))
        .catch(next)
})

module.exports = server