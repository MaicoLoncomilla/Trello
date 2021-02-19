const { Task, Column, Comment } = require('../db.js')

module.exports = {

    read: function (dashboardUuid) {
        return Column.findAll({
            attributes: ['title', 'dashboardUuid', 'columnPriority','uuid'],
            where: { dashboardUuid: dashboardUuid },
            order: ['columnPriority'],
            include: [{
                model: Task,
                attributes: ['title', 'description','columnUuid', 'taskPriority', 'uuid'],
                order: ['taskPriority'],
                include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'taskUuid', 'uuid', 'createdAt'],
                    order: ['createdAt', 'ASC'],
                }]
            }]
        })
    },
    create: function (title, uuid, dashboardUuid, columnPriority) {

        return Column.create({
            title: title,
            uuid: uuid,
            dashboardUuid: dashboardUuid,
            columnPriority: columnPriority
        })
    },

    modify: function (uuid, title) {
        return Column.findOne({
            where: { uuid: uuid }
        })
            .then(column => column.update({ title: title }))
    },
    reorderTaskInColumn: function (uuid, columnUuid) {
        return Task.findOne({
            where: {
                uuid: uuid
            }
        })
            .then(task => task.update({ columnUuid }))
    },

    delete: function (uuid) {
        return Task.destroy({
            where: { columnUuid: uuid }
        })
            .then(() => Column.destroy({ where: { uuid: uuid } }))
    }
}