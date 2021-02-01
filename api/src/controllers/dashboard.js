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
        // Aqui hay que eliminar las Task, Columnas y luego el Dashboard, para que no queden datos inutiles en la base de datos.
        return Dashboard.destroy({
            where: { id: id}
        })
        .then(() => user.getById(idUser))
    }

}

// .then(user => {
//     if (user) throw `User ${email} already exists`
//     return Promise.all([
//         User.create({
//             email, password, firstName, lastName,
//         }),
//         Dashboard.create({
//             title: 'title',
//             description: 'description'
//         }),
//     ])
// })
// .then(([user, dashboard]) => user.addDashboard(dashboard, { through: { state: 'owner' }}))
// .then(([{userId}]) => this.getById(userId))