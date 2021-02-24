const { ImageTask } = require('../db.js')

module.exports = {
  delete: function(uuid){
    return ImageTask.destroy({ where: { taskUuid: uuid }})
  }
}