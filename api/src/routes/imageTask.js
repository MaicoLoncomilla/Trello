const server = require('express').Router();
const task = require('../controllers/task');
const imageTask = require('../controllers/imageTask');
const { ProfileImageUploader } = require('../middlewares/uploadImg');

server.get('/:imageFileName', (req, res, next) => {
    const { imageFileName } = req.params
    if(!imageFileName){
        return res.status(400).send('A filename is required to show the image')
    }
    let splitedPath = __dirname.split(/\/|\\/)
    splitedPath.pop()
    res.sendFile(splitedPath.join('/') + '/media/img/' + imageFileName)
})

server.post('/addCoverTask/:uuid/:dashboardUuid', ProfileImageUploader, (req, res, next) => {
    const { uuid, dashboardUuid } = req.params
    if(!req.file){
        return res.status(400).send(`the image (key:'image') are required to set them on the profile`);
    }
    task.addCoverImage(uuid, dashboardUuid, req.file)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:uuid', (req, res, next) => {
    const { uuid } = req.params;
    imageTask.delete(uuid)
    .then(r => res.send([]))
    .catch(next)
})


module.exports = server