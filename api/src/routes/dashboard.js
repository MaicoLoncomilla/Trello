const server = require('express').Router();
const dashboard = require('../controllers/dashboard');
const { authenticateToken } = require('../middlewares/authentication');

server.get('/uuid', authenticateToken, (req, res, next) => {
    const { uuid } = req.params;
    if (!uuid) {
        return res.status(400).send('You need an id to get all dashboard')
    }
    user.getById(id)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/', authenticateToken, (req, res, next) => {
    const { title, description, idUser, uuid } = req.body;
    if (!title || !description) {
        return res.status(400).send('You need a title and description to create a new dashboard')
    }
    dashboard.create(title, description, idUser, uuid)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/addMembers', authenticateToken, (req, res, next) => {
    const { email, idUser, uuid } = req.body
    if(!email) return res.status(400).send("You need an email")
    dashboard.addMember(email, idUser, uuid)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/', authenticateToken, (req, res, next) => {
    const { uuid, title, description, idUser } = req.body;
    if (!title || !description) {
        return res.status(400).send('You need an Title and description to modify Dashboard')
    }
    dashboard.modify(uuid, title, description, idUser)
        .then(r => res.send(r))
        .catch(next)
})

server.delete('/:uuid/:idUser', authenticateToken, (req, res, next) => {
    const { uuid, idUser } = req.params;
    dashboard.delete(uuid, idUser)
        .then(r => res.send(r))
        .catch(next)
})

module.exports = server