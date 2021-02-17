const { Comment } = require('../db');
const column = require('./column');

module.exports = {

    create: function (commentary, idDashboard) {
        return Comment.create({ commentary })
            .then(() => column.read(idDashboard))
    },

    modify: function (commentary, id, idDashboard) {
        return Comment.findOne({
            where: { id: id }
        })
            .then(comment => comment.update(commentary))
            .then(() => column.read(idDashboard))
    },

    delete: function (id, idDashboard) {
        return Comment.destroy({
            where: { id: id }
        })
            .then(() => column.read(idDashboard))
    }

}