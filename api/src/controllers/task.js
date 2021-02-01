const { Task, Column } = require('../db.js')
const column = require('./column')
module.exports = {

    read: function (id) {
        return Column.findAll({
            attributes: ['id', 'title', 'description', 'dashboardId'],
            where: { dashboardId: id },
            order: ['id'],
            include: [{
                model: Task,
                attributes: ['id', 'title', 'description','columnId'],
                order: ['id']
            }]
        })
    },
    create: function (title, id, idDashboard) {

            return Task.create({
                title: title,
                description: 'description',
                columnId: id
            })
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
    delete: function (id, idDashboard) {
        return Task.destroy({
            where: { id: id }
        })
            .then(() => column.read(idDashboard))
    }
}