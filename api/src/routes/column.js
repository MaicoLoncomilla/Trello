const server = require('express').Router();
const column = require('../controllers/column');

server.get('/:id', (req, res, next) => {
    const { id } = req.params;
    column.read(id)
        .then(r => res.send(r))
        .catch(next)
})

server.post('/', (req, res, next) => {
    const { title, description, id } = req.body;
    column.create(title, description, id)
        .then(r => res.send(r))
        .catch(next)
})

server.put('/', (req, res, next) => {
    const { id, title, description } = req.body;
    column.modify(id, title, description )
        .then(r => res.send(r))
        .catch(next)
})

server.delete('/', (req, res, next) => {
    const { id } = req.body;
    column.delete(id)
        .then(r => res.send(r))
        .catch(next)
})
module.exports = server 