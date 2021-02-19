const { Comment } = require('../db.js');
const column = require('../controllers/column');

module.exports = {

    create: function (comment, taskUuid, uuid) {
        return Comment.create({ comment, taskUuid, uuid })
    },

    modify: function (comment, id) {
        return Comment.findOne({
            where: { id: id }
        })
            .then(commentary => commentary.update(comment))
    },

    delete: function (uuid) {
        return Comment.destroy({
            where: { uuid: uuid }
        })
    }
}