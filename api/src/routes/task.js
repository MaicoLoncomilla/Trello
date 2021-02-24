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
    const { title, columnUuid, uuid, taskPriority } = req.body
    if (!title) {
        return res.status(400).send('You need a title for you task')
    }
    task.create(title, columnUuid, uuid, taskPriority)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/addMember', (req, res, next) => {
    const { email, dashboardUuid, uuid } = req.body
    if(!email) return res.status(400).send('You need an email')
    task.addMember(email, dashboardUuid, uuid)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/', (req, res, next) => {
    const { title, description, uuid } = req.body
    if(!title){
        return res.status(400).send('The task need a title')
    }
    task.update(uuid, title, description)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/reorder/', (req, res, next) => {
    const { tasks } = req.body;
    task.reorderUpdate(tasks)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:uuid', (req, res, next) => {
    const { uuid } = req.params
    if(!uuid){
        return res.status(400).send('You need an Id')
    }
    task.delete(uuid)
    .then(r => res.send([]))
    .catch(next)
})

module.exports = server