const { Dashboard, User, Column, Task } = require('../db');
const user = require('./user')

module.exports = {

    create: function(title, description, idUser, uuid) {
        return Promise.all([
            User.findOne({
                where: { id: idUser}
            }),
            Dashboard.create({
                title: title,
                description: description,
                uuid: uuid
            })
        ]) 
        .then(([user, dashboard]) => user.addDashboard(dashboard, { through: { state: 'owner' }}))
        .then(() => user.getById(idUser))
    },

    modify: function(uuid, title, description, idUser){
        return Dashboard.findOne({
            where: { uuid: uuid }
        })
        .then(dashboard => dashboard.update({ title, description }))
        .then(() => user.getById(idUser))
    },

    delete: function(uuid, idUser){
        return Column.findAll({
            where: { dashboardUuid: uuid }
        })
            .then(column => {
                column.map(el => Task.destroy({ where: { columnUuid: el.uuid } }))
            })
            .then(() => {
                Column.destroy({
                    where: { dashboardUuid: uuid }
                })
                return Dashboard.destroy({
                    where: { uuid: uuid }
                })
            })
            .then(() => user.getById(idUser))
    }
}