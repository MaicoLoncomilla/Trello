const server = require('express').Router()
const comments = require('../controllers/comment');

server.post('/', (req, res , next) => {
    const { comment, dashboardId, taskId, uuid } = req.body;
    if(!comment) return res.status(400).send('Comment need a title')
    comments.create(comment, dashboardId, taskId, uuid)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/', (req, res, next) => {
    const { comment, dashboardId } = req.body;
    if(!comment) return res.status(400).send('Comment need a title')
    comments.modify(comment, dashboardId)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:id/:dashboardId', (req, res, next) => {
    const { id, dashboardId } = req.params;
    comments.delete(id, dashboardId)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server