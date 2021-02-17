const { Task, Column, Comment } = require('../db.js')
const column = require('./column')
module.exports = {

    read: function (id) {
        return Column.findAll({
            attributes: ['id', 'title', 'description', 'dashboardId', 'columnPriority'],
            where: { dashboardId: id },
            order: ['id'],
            include: [{
                model: Task,
                attributes: ['id', 'title', 'description','columnId', 'taskPriority'],
                order: ['taskPriority'],
                include: {
                    model: Comment,
                    attributes: ['id', 'comment']
                }
            }]
        })
    },
    create: function (title, id, idDashboard) {
        
            return Task.create({
                title: title,
                description: '',
                columnId: id,
            })
            .then(({dataValues}) => {
                return Task.findOne({
                    where: {
                        id: dataValues.id
                    }
                })
            })
            .then(task => task.update({ taskPriority: task.id}))
            .then(() => column.read(idDashboard))
    },
    update: function (id, title, description, idDashboard) {
        return Task.findOne({
            where: {
                id: id
            }
        })
            .then(task => task.update({ title, description }))
            .then(() => column.read(idDashboard))
    },
    reorderUpdate: function (idDashboard, tasks) {
        tasks.map((el, index) => {
            let taskPriority = el.taskPriority
            return Task.findOne({
                where: { id: el.id }
            })
                .then(task => task.update({ taskPriority }))
        })
        return this.read(idDashboard)
    },
    delete: function (id, idDashboard) {
        return Task.destroy({
            where: { id: id }
        })
            .then(() => column.read(idDashboard))
    }
}