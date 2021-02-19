const server = require('express').Router()
const comments = require('../controllers/comment');

server.post('/', (req, res , next) => {
    const { comment, taskUuid, uuid } = req.body;
    if(!comment) return res.status(400).send('Comment need a title')
    comments.create(comment, taskUuid, uuid)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/', (req, res, next) => {
    const { comment } = req.body;
    if(!comment) return res.status(400).send('Comment need a title')
    comments.modify(comment)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:uuid', (req, res, next) => {
    const { uuid } = req.params;
    comments.delete(uuid)
    .then(r => res.send([]))
    .catch(next)
})

module.exports = server