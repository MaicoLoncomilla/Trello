const { Comment } = require('../db.js');
const column = require('../controllers/column');

module.exports = {

    create: function (comment, taskUuid, uuid, userId) {
        return Comment.create({ comment, taskUuid, uuid, userId })
        .then(() => column.read(userId))
    },

    modify: function (comment, uuid) {
        return Comment.findOne({
            where: { uuid: uuid }
        })
            .then(commentary => commentary.update({ comment: comment }))
    },

    delete: function (uuid) {
        return Comment.destroy({
            where: { uuid: uuid }
        })
    }
}