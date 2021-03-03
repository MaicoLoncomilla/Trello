const { Dashboard, User, Column, Task, Image, UserRol, Comment } = require('../db');
const { login } = require('./user');
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
    addMember: function (email, idUser, uuid) {
        
        return Promise.all([
            User.findOne({ where: { email: email } }),
            Dashboard.findOne({ where: { uuid: uuid } })
        ])
            .then(([user, dashboard]) => {
                if (!user) throw 'User not found'
                dashboard.addUser(user, { through: { state: 'owner' } })
            })
            .then(() => {
                return User.findOne({
                    where: { id: idUser },
                    attributes: ['email', 'password']
                })
            })
            .then(({ dataValues }) => user.login(dataValues.email, dataValues.password))
    },

    modify: function (uuid, title, description, idUser) {
        return Dashboard.findOne({
            where: { uuid: uuid }
        })
            .then(dashboard => dashboard.update({ title, description }))
            .then(() => user.getById(idUser))
    },

    delete: function (uuid, idUser) {
        return Dashboard.destroy({ where: { uuid: uuid }})
        .then(() => user.getById(idUser))
    }
}