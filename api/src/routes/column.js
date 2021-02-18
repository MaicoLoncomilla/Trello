const server = require('express').Router();
const column = require('../controllers/column');

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    column.read(id)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/', (req, res, next) => {
    const { title, uuid, dashboardId } = req.body;
    column.create(title, uuid, dashboardId)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', (req, res, next) => {
    const { id, title, dashboardId } = req.body;
    if(!title){
        return res.status(400).send('The column need a title')
    }
    column.modify(id, title, dashboardId)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/reordertask/', (req, res ,next) => {
    const { id, columnId } = req.body
    column.reorderTaskInColumn(id, columnId)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:id/:dashboardId', (req, res, next) => {
    const { id, dashboardId } = req.params;
    column.delete(id, dashboardId)
        .then(r => res.send(r))
        .catch(next)
})
module.exports = server 