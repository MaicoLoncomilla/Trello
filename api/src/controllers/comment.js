const { Comment } = require('../db.js');
const column = require('../controllers/column');

module.exports = {

    create: function (comment, dashboardUuid, taskUuid, uuid) {
        return Comment.create({ comment, taskUuid, uuid })
            .then(() => column.read(dashboardUuid))
    },

    modify: function (comment, id, dashboardUuid) {
        return Comment.findOne({
            where: { id: id }
        })
            .then(commentary => commentary.update(comment))
            .then(() => column.read(dashboardUuid))
    },

    delete: function (id, dashboardUuid) {
        return Comment.destroy({
            where: { id: id }
        })
            .then(() => column.read(dashboardUuid))
    }
}