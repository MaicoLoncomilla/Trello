const server = require('express').Router();
const user = require('../controllers/user');

server.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if(!email){
        return res.status(400).send('You need an Email!')
    }
    user.login(email, password)
    .then(r => res.send(r))
    .catch(next)
})

server.post('/register', (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;
    if(!email || !password || !firstName || !lastName){
        return res.status(400).send('Error! Complete the form')
    }
    user.register(email, password, firstName, lastName)
    .then(r => res.send(r))
    .catch(next)
})


module.exports = server