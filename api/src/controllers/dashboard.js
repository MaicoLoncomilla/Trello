const { Dashboard, User } = require('../db');

module.exports = {

    read: function(id){
        return Dashboard.findAll({
            where: { email: email },
            attributes:['id', 'title', 'description'],
        })
    },

    create: function(id, title, description) {
        return Dashboard.create({
            title: title,
            description: description
        })
        .then(() => this.read(id))
    },

    modify: function(id, title, description){
        return Dashboard.findOne({
            where: { id: id}
        })
        .then(dashboard => dashboard.update({ title, description}))
        .then(() => this.read(id))
    },

    delete: function(id, email){
        return Dashboard.destroy({
            where: { id: id}
        })
        .then(() => this.read(id))
    }

}