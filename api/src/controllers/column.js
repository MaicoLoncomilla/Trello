const { Task, Column, Comment } = require('../db.js')

module.exports = {

    read: function (dashboardId) {
        return Column.findAll({
            attributes: ['title', 'dashboardId', 'columnPriority','uuid'],
            where: { dashboardId: dashboardId },
            order: ["createdAt"],
            include: [{
                model: Task,
                attributes: ['title', 'description','columnUuid', 'taskPriority', 'uuid'],
                order: ["taskPriority"],
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

    modify: function (uuid, title, dashboardId) {
        return Column.findOne({
            where: { uuid: uuid }
        })
            .then(column => column.update({ title: title }))
            .then(() => this.read(dashboardId))
    },
    reorderTaskInColumn: function (uuid, columnUuid) {
        return Task.findOne({
            where: {
                uuid: uuid
            }
        })
            .then(task => task.update({ columnUuid }))
    },

    delete: function (uuid, dashboardId) {
        return Task.destroy({
            where: { columnUuid: uuid }
        })
            .then(() => Column.destroy({ where: { uuid: uuid } }))
            .then(() => this.read(dashboardId))
    }
}