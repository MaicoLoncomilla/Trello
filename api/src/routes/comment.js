const server = require('express').Router()
const comments = require('../controllers/comment');
const { authenticateToken } = require('../middlewares/authentication');

server.post('/', authenticateToken, (req, res , next) => {
    const { comment, taskUuid, uuid, userId} = req.body;
    if(!comment) return res.status(400).send('Comment need a title')
    comments.create(comment, taskUuid, uuid, userId)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/', authenticateToken, (req, res, next) => {
    const { comment, uuid } = req.body;
    if(!comment) return res.status(400).send('Comment need a title')
    comments.modify(comment, uuid)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:uuid', authenticateToken, (req, res, next) => {
    const { uuid } = req.params;
    comments.delete(uuid)
    .then(r => res.send([]))
    .catch(next)
})

module.exports = server