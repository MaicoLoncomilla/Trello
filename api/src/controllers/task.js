const { Task, Column, Comment } = require('../db.js')
const column = require('./column')
module.exports = {

    read: function (dashboardId) {
        return Column.findAll({
            attributes: ['id', 'title', 'dashboardId', 'columnPriority', 'uuid'],
            where: { dashboardId: dashboardId },
            order: ["id"],
            include: [{
                model: Task,
                attributes: ['id', 'title', 'description','columnId', 'taskPriority', 'uuid'],
                order: ['taskPriority'],
                include: {
                    model: Comment,
                    attributes: ['id', 'comment']
                }
            }]
        })
    },
    create: function (title, columnId, dashboardId, uuid) {
        
            return Task.create({
                title: title,
                description: '',
                uuid: uuid,
                columnId: columnId,
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
    update: function (id, title, description, dashboardId) {
        return Task.findOne({
            where: {
                id: id
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
    delete: function (id, dashboardId) {
        return Task.destroy({
            where: { id: id }
        })
            .then(() => column.read(dashboardId))
    }
}