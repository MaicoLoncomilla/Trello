const { Task, Column, Comment } = require('../db.js')
const column = require('./column')
module.exports = {

    read: function (dashboardId) {
        return Column.findAll({
            attributes: ['title', 'dashboardId', 'columnPriority', 'uuid'],
            where: { dashboardId: dashboardId },
            order: ["createdAt"],
            include: [{
                model: Task,
                attributes: ['title', 'description','columnUuid', 'taskPriority', 'uuid'],
                order: ['taskPriority'],
                include: {
                    model: Comment,
                    attributes: ['id', 'comment']
                }
            }]
        })
    },
    create: function (title, columnUuid, dashboardId, uuid) {
        
            return Task.create({
                title: title,
                description: '',
                uuid: uuid,
                columnUuid: columnUuid,
            })
            .then(({dataValues}) => {
                return Task.findOne({
                    where: {
                        id: dataValues.id
                    }
                })
            })
            .then(task => task.update({ taskPriority: task.id}))
            .then(() => column.read(dashboardId))
    },
    update: function (uuid, title, description, dashboardId) {
        return Task.findOne({
            where: {
                uuid: uuid
            }
        })
            .then(task => task.update({ title, description }))
            .then(() => column.read(dashboardId))
    },
    reorderUpdate: function (dashboardId, tasks) {
        tasks.map((el, index) => {
            let taskPriority = el.taskPriority
            return Task.findOne({
                where: { uuid: el.uuid }
            })
                .then(task => task.update({ taskPriority }))
        })
        return this.read(dashboardId)
    },
    delete: function (uuid, dashboardId) {
        return Task.destroy({
            where: { uuid: uuid }
        })
            .then(() => column.read(dashboardId))
    }
}