const { Task, Column, User, Dashboard, UserRol } = require('../db.js')

module.exports = {
    
    login: function (email, password) {
        return User.findOne({
            attributes: ['id', 'email', 'password', 'firstName', 'lastName'],
            where: { email: email },
            include: [{
                model: Dashboard,
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: ['state']
                },
                // include: {
                //     model: Column,
                //     attributes: ['id', 'title', 'description', 'dashboardId'],
                //     include: {
                //         model: Task,
                //         attributes: ['id', 'title', 'description']
                //     }
                // }
            }]
        })
            .then(user => this.matchPassword(user, password))
            .then(user => this.loginUser(user))
    },
    matchPassword: function (user, password) {
        if (user.password !== password) throw 'Wrong password'
        return user
    },
    loginUser: function (user) {
        const sesion = {...user.dataValues}
        delete sesion.password
        return sesion
    },

    register: function (email, password, firstName, lastName) {
        return User.findOne({
            attributes: ['id'],
            where: { email }
        })
            .then(user => {
                if (user) throw `User ${email} already exists`
                return Promise.all([
                    User.create({
                        email, password, firstName, lastName,
                    }),
                    Dashboard.create({
                        title: 'title',
                        description: 'description'
                    }),
                ])
            })
            .then(([user, dashboard]) => user.addDashboard(dashboard, { through: { state: 'owner' }}))
            .then(([{userId}]) => this.getById(userId))
    },
    // addDashboard añadir datos al dashboard
    // addUser
    // set pisa el array anterior, hay que pasarle un array
    // ver destroyDashboard 

    getById: function (id) {
        return User.findOne({
            attributes: ['id', 'email', 'firstName', 'lastName'],
            where: { id: id },
            include: [{
                model: Dashboard,
                attributes: ['id', 'title', 'description'],
                through: {
                    attributes: ['state']
                }
            }]
        })
    }
}