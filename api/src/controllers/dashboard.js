const { Dashboard, User, Image } = require('../db');
const user = require('./user')

module.exports = {

    create: function(title, idUser, uuid, dashboardPriority) {
        return Promise.all([
            User.findOne({
                where: { id: idUser}
            }),
            Dashboard.create({
                title: title,
                uuid: uuid,
                dashboardPriority: dashboardPriority
            })
        ]) 
        .then(([user, dashboard]) => user.addDashboard(dashboard, { through: { state: 'owner' }}))
    },
    addMember: function (email, idUser, uuid) {
        
        return Promise.all([
            User.findOne({ where: { email: email } }),
            Dashboard.findOne({ where: { uuid: uuid } })
        ])
            .then(([user, dashboard]) => {
                if (!user) throw 'User not found'
                return dashboard.addUser(user, { through: { state: 'owner' } })
            })
            .then(() => user.getById(idUser))
    },

    modify: function (uuid, title, idUser) {
        return Dashboard.findOne({
            where: { uuid: uuid }
        })
            .then(dashboard => dashboard.update({ title }))
            .then(() => user.getById(idUser))
    },

    delete: function (uuid, idUser) {
        return Dashboard.destroy({ where: { uuid: uuid }})
        .then(() => user.getById(idUser))
    }
}