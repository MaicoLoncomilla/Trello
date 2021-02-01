const server = require('express').Router()
const user = require('../controllers/user')
const image = require('../controllers/image')
const { ProfileImageUploader } = require('../middlewares/uploadImg')

server.get('/:imageFileName', (req, res, next) => {
    const { imageFileName } = req.params
    if(!imageFileName){
        return res.status(400).send('A filename is required to show the image')
    }
    let splitedPath = __dirname.split(/\/|\\/)
    splitedPath.pop()
    res.sendFile(splitedPath.join('/') + '/media/img/' + imageFileName)
})

server.post('/:id', ProfileImageUploader, (req, res ,next) => {
    if (!req.file) {
		return res.status(400).send(`the image (key:'image') are required to set them on the profile`);
	}
    user.setImage(req.params.id, req.file)
	.then(r => res.send(r))
	.catch(next);
})

module.exports = server