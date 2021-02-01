const server = require('express').Router();
const dashboard = require('../controllers/dashboard');
const user = require('../controllers/user')

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('You need an id to get all dashboard')
    }
    user.getById(id)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/', (req, res, next) => {
    const { title, description, idUser } = req.body;
    if (!title || !description) {
        return res.status(400).send('You need a title and description to create a new dashboard')
    }
    dashboard.create(title, description, idUser)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', (req, res, next) => {
    const { id, title, description, idUser } = req.body;
    if (!title || !description) {
        return res.status(400).send('You need an Title and description to modify Dashboard')
    }
    dashboard.modify(id, title, description, idUser)
        .then(r => res.send(r))
        .catch(next)
})

server.delete('/:id/:idUser', (req, res, next) => {
    const { id, idUser } = req.params;
    dashboard.delete(id, idUser)
        .then(r => res.send(r))
        .catch(next)
})

module.exports = server