const { User, Dashboard, Image } = require('../db.js');
const { v4 } = require('uuid');
const uuidv4 = v4;
module.exports = {
    
    login: function (email, password) {
        return User.findOne({
            attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'salt'],
            where: { email: email },
            include: [{
                model: Dashboard,
                attributes: ['title', 'uuid', 'dashboardPriority'],
                order: ['dashboardPriority'],
                through: {
                    attributes: ['state']
                },
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                    include: {
                        model: Image,
                        attributes: ['url']
                    }
                }
            },{
                model: Image,
                attributes: ['url']
            }]
        })
            .then(user => {
                if(!user) throw "The email you entered isn't connected to an account. Create a new account."
                return this.matchPassword(user, password)
            })
            .then(user => this.loginUser(user))
    },
    matchPassword: function (user, password) {
        if(!user.correctPassword(password)) throw 'Email or Password incorrect'
        return user
    },
    loginUser: function (user) {
        const sesion = {...user.dataValues}
        delete sesion.password
        delete sesion.salt
        return sesion
    },

    setImage: function (id, img) {
        let userPromise = User.findByPk(id);
        let imagePromise = Image.findOrCreate({
            where: { fileName: img.filename }
        })
            .then(r => r[0])
        return Promise.all([userPromise, imagePromise])
            .then(([user, image]) => user.setImage(image))
            .then(() => (this.getById(id)))
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
                        title: 'Title',
                        uuid: uuidv4(),
                        dashboardPriority: 1
                    }),
                ])
            })
            .then(([user, dashboard]) => user.addDashboard(dashboard, { through: { state: 'owner' }}))
            .then(([{userId}]) => this.getById(userId))
    },

    getById: function (id) {
        return User.findOne({
            attributes: ['id', 'email', 'password', 'firstName', 'lastName', 'salt'],
            where: { id: id },
            include: [{
                model: Dashboard,
                attributes: ['title', 'uuid', 'dashboardPriority'],
                order: ['dashboardPriority'],
                through: {
                    attributes: ['state']
                },
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName', 'email'],
                    include: {
                        model: Image,
                        attributes: ['url']
                    }
                }
            },{
                model: Image,
                attributes: ['url']
            }]
        })
    },
}