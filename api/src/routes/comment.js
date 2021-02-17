const server = require('express').Router()
const comment = require('../controllers/comment');

server.post('/', (req, res , next) => {
    const { commentary, idDashboard } = req.body;
    if(!commentary) return res.status(400).send('Comment need a title')
    comment.create(commentary, idDashboard)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/', (req, res, next) => {
    const { commentary, idDashboard } = req.body;
    if(!commentary) return res.status(400).send('Comment need a title')
    comment.modify(commentary, idDashboard)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:id/:idDashboard', (req, res, next) => {
    const { id, idDashboard } = req.params;
    comment.delete(id, idDashboard)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server