const server = require('express').Router();
const task = require('../controllers/task');
const column = require('../controllers/column');

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send('You need an ID')
    }
    column.read(id)
    // task.read(id)
    .then(r => res.send(r))
    .catch(next)
})

server.post('/', (req, res, next) => {
    const { title, id, idDashboard } = req.body
    if (!title) {
        return res.status(400).send('You need a title for you task')
    }
    task.create(title, id, idDashboard)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', (req, res, next) => {
    const { title, description, id, idDashboard } = req.body
    if(!title){
        return res.status(400).send('The task need a title')
    }
    task.update(id, title, description, idDashboard)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:id/:idDashboard', (req, res, next) => {
    const { id, idDashboard } = req.params
    if(!id){
        return res.status(400).send('You need an Id')
    }
    task.delete(id, idDashboard)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server