const { Task, Column } = require('../db.js')

module.exports = {

    read: function (id) {
        return Column.findAll({
            attributes: ['id', 'title', 'description', 'dashboardId', 'columnPriority'],
            where: { dashboardId: id },
            order: ['id'],
            include: [{
                model: Task,
                attributes: ['id', 'title', 'description','columnId', 'taskPriority'],
                order: ['id']
            }]
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

    modify: function (id, title, idDashboard) {
        return Column.findOne({
            where: { id: id }
        })
            .then(column => column.update({ title: title }))
            .then(() => this.read(idDashboard))
    },
    reorderTaskInColumn: function (id, columnId) {
        return Task.findOne({
            where: {
                id: id
            }
        })
            .then(task => task.update({ columnId }))
    },

    delete: function (id, idDashboard) {
        return Task.destroy({
            where: { columnId: id }
        })
            .then(() => Column.destroy({ where: { id: id } }))
            .then(() => this.read(idDashboard))
    }
}