const server = require('express').Router()
const comments = require('../controllers/comment');

server.post('/', (req, res , next) => {
    const { comment, dashboardUuid, taskUuid, uuid } = req.body;
    if(!comment) return res.status(400).send('Comment need a title')
    comments.create(comment, dashboardUuid, taskUuid, uuid)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/', (req, res, next) => {
    const { comment, dashboardUuid } = req.body;
    if(!comment) return res.status(400).send('Comment need a title')
    comments.modify(comment, dashboardUuid)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:id/:dashboardUuid', (req, res, next) => {
    const { id, dashboardUuid } = req.params;
    comments.delete(id, dashboardUuid)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server