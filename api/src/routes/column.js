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
    const { id, title, idDashboard } = req.body;
    if(!title){
        return res.status(400).send('The column need a title')
    }
    column.modify(id, title, idDashboard)
        .then(r => res.send(r))
        .catch(next)
})

server.delete('/:id/:idDashboard', (req, res, next) => {
    const { id, idDashboard } = req.params;
    column.delete(id, idDashboard)
        .then(r => res.send(r))
        .catch(next)
})
module.exports = server 