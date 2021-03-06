const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/media/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const ProfileImageUploader = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const { mimetype} = file

        const extensionSupported = /jpg|jpeg|png|svg/.test(mimetype);
        if (!extensionSupported) cb(new Error('only extensions [.jpeg, .jpg, .png, .svg] are supported'))

        cb(null, true)
    }
}).single('image')

module.exports = { ProfileImageUploader }