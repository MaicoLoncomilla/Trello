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
    const { title, columnUuid, dashboardUuid, uuid } = req.body
    if (!title) {
        return res.status(400).send('You need a title for you task')
    }
    task.create(title, columnUuid, dashboardUuid, uuid)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', (req, res, next) => {
    const { title, description, uuid, dashboardUuid } = req.body
    if(!title){
        return res.status(400).send('The task need a title')
    }
    task.update(uuid, title, description, dashboardUuid)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/reorder/', (req, res, next) => {
    const { dashboardUuid, tasks } = req.body;
    task.reorderUpdate(dashboardUuid, tasks)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:uuid/:dashboardId', (req, res, next) => {
    const { uuid, dashboardUuid } = req.params
    if(!id){
        return res.status(400).send('You need an Id')
    }
    task.delete(uuid, dashboardUuid)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server