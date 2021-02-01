const { Image } = require('../db.js')
const fs = require('fs')

function readFile(path) {
    return new Promise(
        function (resolve, reject) {
            fs.readFile(path, function (err, str) {
                if (err) {
                    reject(err)
                } else {
                    resolve(str)
                }
            })
        }
    )
}

module.exports = {
    read: function(imageFileName){
        return readFile('./src/media/img/' + imageFileName)
    }
}