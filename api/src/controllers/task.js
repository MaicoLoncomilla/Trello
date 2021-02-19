const { Task, Column, Comment } = require('../db.js')
const column = require('./column')
module.exports = {

    read: function (dashboardUuid) {
        return Column.findAll({
            attributes: ['title', 'dashboardUuid', 'columnPriority', 'uuid'],
            where: { dashboardUuid: dashboardUuid },
            order: ["columnPriority"],
            include: [{
                model: Task,
                attributes: ['title', 'description','columnUuid', 'taskPriority', 'uuid'],
                order: ['taskPriority'],
                include: {
                    model: Comment,
                    attributes: ['id', 'comment', 'uuid', 'taskUuid']
                }
            }]
        })
    },
    create: function (title, columnUuid, uuid, taskPriority) {
        
            return Task.create({
                title: title,
                description: '',
                uuid: uuid,
                columnUuid: columnUuid,
                taskPriority: taskPriority
            })
    },
    update: function (uuid, title, description) {
        return Task.findOne({
            where: {
                uuid: uuid
            }
        })
            .then(task => task.update({ title, description }))
    },
    reorderUpdate: function (tasks) {
        tasks.map((el, index) => {
            let taskPriority = el.taskPriority
            return Task.findOne({
                where: { uuid: el.uuid }
            })
                .then(task => task.update({ taskPriority }))
        })
    },
    delete: function (uuid) {
        return Task.destroy({
            where: { uuid: uuid }
        })
    }
}