const { Comment } = require('../db.js');
const column = require('../controllers/column');

module.exports = {

    create: function (comment, dashboardId, taskId, uuid) {
        return Comment.create({ comment ,taskId, uuid })
            .then(() => column.read(dashboardId))
    },

    modify: function (comment, id, dashboardId) {
        return Comment.findOne({
            where: { id: id }
        })
            .then(commentary => commentary.update(comment))
            .then(() => column.read(dashboardId))
    },

    delete: function (id, dashboardId) {
        return Comment.destroy({
            where: { id: id }
        })
            .then(() => column.read(dashboardId))
    }
}