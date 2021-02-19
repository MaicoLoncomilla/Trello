const { Task, Column, Comment } = require('../db.js')

module.exports = {

    read: function (dashboardUuid) {
        return Column.findAll({
            attributes: ['title', 'dashboardUuid', 'columnPriority','uuid'],
            where: { dashboardUuid: dashboardUuid },
            order: ["createdAt"],
            include: [{
                model: Task,
                attributes: ['title', 'description','columnUuid', 'taskPriority', 'uuid'],
                order: ["createdAt"],
                include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'taskUuid', 'uuid'],
                    order: ["id"],
                }]
            }]
        })
    },
    create: function (title, uuid, dashboardUuid) {

        return Column.create({
            title: title,
            uuid: uuid,
            dashboardUuid: dashboardUuid
        })
            .then(() => this.read(dashboardUuid))
    },

    modify: function (uuid, title, dashboardUuid) {
        return Column.findOne({
            where: { uuid: uuid }
        })
            .then(column => column.update({ title: title }))
            .then(() => this.read(dashboardUuid))
    },
    reorderTaskInColumn: function (uuid, columnUuid) {
        return Task.findOne({
            where: {
                uuid: uuid
            }
        })
            .then(task => task.update({ columnUuid }))
    },

    delete: function (uuid, dashboardUuid) {
        return Task.destroy({
            where: { columnUuid: uuid }
        })
            .then(() => Column.destroy({ where: { uuid: uuid } }))
            .then(() => this.read(dashboardUuid))
    }
}