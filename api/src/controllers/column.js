const { Task, Column, Comment } = require('../db.js')

module.exports = {

    read: function (dashboardId) {
        return Column.findAll({
            attributes: ['id', 'title', 'dashboardId', 'columnPriority','uuid'],
            where: { dashboardId: dashboardId },
            order: ["id"],
            include: [{
                model: Task,
                attributes: ['id', 'title', 'description','columnId', 'taskPriority', 'uuid'],
                order: ["id"],
                include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'taskId'],
                    order: ["id"],
                }]
            }]
        })
    },
    create: function (title, uuid, dashboardId) {

        return Column.create({
            title: title,
            uuid: uuid,
            dashboardId: dashboardId
        })
            .then(() => this.read(dashboardId))
    },

    modify: function (id, title, dashboardId) {
        return Column.findOne({
            where: { id: id }
        })
            .then(column => column.update({ title: title }))
            .then(() => this.read(dashboardId))
    },
    reorderTaskInColumn: function (uuid, columnId) {
        return Task.findOne({
            where: {
                uuid: uuid
            }
        })
            .then(task => task.update({ columnId }))
    },

    delete: function (id, dashboardId) {
        return Task.destroy({
            where: { columnId: id }
        })
            .then(() => Column.destroy({ where: { id: id } }))
            .then(() => this.read(dashboardId))
    }
}