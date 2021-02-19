const server = require('express').Router();
const column = require('../controllers/column');

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    column.read(id)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/', (req, res, next) => {
    const { title, uuid, dashboardUuid } = req.body;
    column.create(title, uuid, dashboardUuid)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', (req, res, next) => {
    const { uuid, title, dashboardUuid } = req.body;
    if(!title){
        return res.status(400).send('The column need a title')
    }
    column.modify(uuid, title, dashboardUuid)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/reordertask/', (req, res ,next) => {
    const { uuid, columnUuid } = req.body
    column.reorderTaskInColumn(uuid, columnUuid)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:uuid/:dashboardUuid', (req, res, next) => {
    const { uuid, dashboardUuid } = req.params;
    column.delete(uuid, dashboardUuid)
        .then(r => res.send(r))
        .catch(next)
})
module.exports = server 