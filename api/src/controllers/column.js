const { Task, Column } = require('../db.js')

module.exports = {

    read: function (id) {
        return Column.findAll({
            attributes: ['id', 'description', 'title', 'dashboardId'],
            order: ['id'],
            where: { dashboardId: id },
        })
    },
    create: function (title, description, id) {

        return Column.create({
            title: title,
            description: description,
            dashboardId: id
        })
            .then(() => this.read(id))
    },

    modify: function (id, title, description) {
        return Column.findOne({
            where: { id: id }
        })
            .then(column => column.update({ title: title, description: description }))
            .then(() => this.read(id))
    },

    delete: function (id) {
        return Column.destroy({
            where: { id: id }
        })
            .then(() => this.read(id))
    }
}