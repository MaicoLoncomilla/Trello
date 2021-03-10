const server = require('express').Router();
const column = require('../controllers/column');
const { authenticateToken } = require('../middlewares/authentication');

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    column.read(id)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/', authenticateToken, (req, res, next) => {
    const { title, uuid, dashboardUuid, columnPriority } = req.body;
    column.create(title, uuid, dashboardUuid, columnPriority)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', authenticateToken, (req, res, next) => {
    const { uuid, title } = req.body;
    if(!title){
        return res.status(400).send('The column need a title')
    }
    column.modify(uuid, title)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/reordertask/', authenticateToken, (req, res ,next) => {
    const { uuid, columnUuid } = req.body
    column.reorderTaskInColumn(uuid, columnUuid)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/reorderColumnPriority', authenticateToken, (req, res, next) => {
    column.reorderColumnPriority(req.body)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:uuid', authenticateToken, (req, res, next) => {
    const { uuid } = req.params;
    column.delete(uuid)
        .then(r => res.send([]))
        .catch(next)
})
module.exports = server 