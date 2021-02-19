const { Task, Column, Comment } = require('../db.js')
const column = require('./column')
module.exports = {

    read: function (dashboardUuid) {
        return Column.findAll({
            attributes: ['title', 'dashboardUuid', 'columnPriority', 'uuid'],
            where: { dashboardUuid: dashboardUuid },
            order: ["createdAt"],
            include: [{
                model: Task,
                attributes: ['title', 'description','columnUuid', 'taskPriority', 'uuid'],
                order: ['createdAt'],
                include: {
                    model: Comment,
                    attributes: ['id', 'comment', 'uuid', 'taskUuid']
                }
            }]
        })
    },
    create: function (title, columnUuid, dashboardUuid, uuid) {
        
            return Task.create({
                title: title,
                description: '',
                uuid: uuid,
                columnUuid: columnUuid,
            })
            .then(() => column.read(dashboardUuid))
    },
    update: function (uuid, title, description, dashboardUuid) {
        return Task.findOne({
            where: {
                uuid: uuid
            }
        })
            .then(task => task.update({ title, description }))
            .then(() => column.read(dashboardUuid))
    },
    reorderUpdate: function (dashboardUuid, tasks) {
        tasks.map((el, index) => {
            let taskPriority = el.taskPriority
            return Task.findOne({
                where: { uuid: el.uuid }
            })
                .then(task => task.update({ taskPriority }))
        })
        return this.read(dashboardUuid)
    },
    delete: function (uuid, dashboardUuid) {
        return Task.destroy({
            where: { uuid: uuid }
        })
            .then(() => column.read(dashboardUuid))
    }
}