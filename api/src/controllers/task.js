const { Task, Column } = require('../db.js')
module.exports = {

    read: function (idDashboard) {
        return Column.findAll({
            attributes: ['id', 'title', 'description', 'dashboardId'],
            where: { dashboardId: idDashboard },
            order: ['id'],
            include: [{
                model: Task,
                attributes: ['id', 'title', 'description','columnId']
            }]
        })
    },
    create: function (title, id, idDashboard) {

            return Task.create({
                title: title,
                description: 'description',
                columnId: id
            })
            .then(() => this.read(idDashboard))
    },
    update: function (id, title, description) {
        return Task.findOne({
            where: {
                id: id
            }
        })
            .then(task => task.update({ title, description }))
            .then(() => this.read(id))
    },
    delete: function (id) {
        return Task.destroy({
            where: { id: id }
        })
            .then(() => this.read(id))
    }
}