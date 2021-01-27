const server = require('express').Router();
const task = require('../controllers/task');
const column = require('../controllers/column');

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send('You need an ID')
    }
    task.read(id)
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

server.put('/:id', (req, res, next) => {
    const { id } = req.params
    const { title, description } = req.body
    if(!id){
        return res.status(400).send('You need an Id')
    }
    task.update(id, title, description)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:id', (req, res, next) => {
    const { id } = req.params
    if(!id){
        return res.status(400).send('You need an Id')
    }
    task.delete(id)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server