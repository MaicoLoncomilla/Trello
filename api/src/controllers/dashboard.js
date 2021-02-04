const { Dashboard, User, Column, Task } = require('../db');
const user = require('./user')

module.exports = {

    create: function(title, description, idUser) {
        return Promise.all([
            User.findOne({
                where: { id: idUser}
            }),
            Dashboard.create({
                title: title,
                description: description,
            })
        ]) 
        .then(([user, dashboard]) => user.addDashboard(dashboard, { through: { state: 'owner' }}))
        .then(() => user.getById(idUser))
    },

    modify: function(id, title, description, idUser){
        return Dashboard.findOne({
            where: { id: id }
        })
        .then(dashboard => dashboard.update({ title, description}))
        .then(() => user.getById(idUser))
    },

    delete: function(id, idUser){
        return Column.findAll({
            where: { dashboardId: id }
        })
            .then(column => {
                column.map(el => Task.destroy({ where: { columnId: el.id } }))
            })
            .then(() => {
                Column.destroy({
                    where: { dashboardId: id }
                })
                return Dashboard.destroy({
                    where: { id: id }
                })
            })
            .then(() => user.getById(idUser))
    }
}