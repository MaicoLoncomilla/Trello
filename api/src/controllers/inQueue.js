const { InQueue } = require('../db.js');

module.exports = {

    read: function () {
        return InQueue.findAll();
    },

    create: function (title, description) {
        return InQueue.create({
            name: title,
            description: description
        })
            .then(() => this.read())
    }
}