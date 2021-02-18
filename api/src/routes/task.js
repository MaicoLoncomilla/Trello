const server = require('express').Router();
const task = require('../controllers/task');
const column = require('../controllers/column');

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send('You need an ID')
    }
    column.read(id)
    .then(r => res.send(r))
    .catch(next)
})

server.post('/', (req, res, next) => {
    const { title, columnId, dashboardId, uuid } = req.body
    if (!title) {
        return res.status(400).send('You need a title for you task')
    }
    task.create(title, columnId, dashboardId, uuid)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', (req, res, next) => {
    const { title, description, id, dashboardId } = req.body
    if(!title){
        return res.status(400).send('The task need a title')
    }
    task.update(id, title, description, dashboardId)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/reorder/', (req, res, next) => {
    const { dashboardId, tasks } = req.body;
    task.reorderUpdate(dashboardId, tasks)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:id/:dashboardId', (req, res, next) => {
    const { id, dashboardId } = req.params
    if(!id){
        return res.status(400).send('You need an Id')
    }
    task.delete(id, dashboardId)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server