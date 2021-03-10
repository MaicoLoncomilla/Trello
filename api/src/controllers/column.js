const { Task, Column, Comment, User, Image, ImageTask } = require('../db.js')

module.exports = {

    read: function (dashboardUuid) {
        return Column.findAll({
            attributes: ['title', 'dashboardUuid', 'columnPriority', 'uuid'],
            where: { dashboardUuid: dashboardUuid },
            order: ['columnPriority'],
            include: [{
                model: Task,
                attributes: ['title', 'description', 'columnUuid', 'taskPriority', 'uuid'],
                order: ['taskPriority'],
                include: [{
                    model: Comment,
                    attributes: ['id', 'comment', 'taskUuid', 'uuid', 'createdAt'],
                    order: ['createdAt', 'ASC'],
                    include: {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName', 'email'],
                        order: ['createdAt', 'ASC'],
                        include: {
                            model: Image,
                            attributes: ['url']
                        }
                    }
                }, {
                    model: User,
                    attributes: ['firstName', 'lastName', 'email'],
                    order: ['createdAt', 'ASC'],
                    through: {
                        attributes: []
                    },
                    include: {
                        model: Image,
                        attributes: ['url']
                    }
                },{
                    model: ImageTask,
                    attributes: ['url']
                }],
            }]
        })
    },
    create: function (title, uuid, dashboardUuid, columnPriority) {

        return Column.create({
            title: title,
            uuid: uuid,
            dashboardUuid: dashboardUuid,
            columnPriority: columnPriority
        })
    },

    modify: function (uuid, title) {
        return Column.findOne({ where: { uuid: uuid } })
            .then(column => column.update({ title: title }))
    },
    reorderTaskInColumn: function (uuid, columnUuid) {
        return Task.findOne({
            where: {
                uuid: uuid
            }
        })
            .then(task => task.update({ columnUuid }))
    },

    reorderColumnPriority: function(column){
        return Promise.all([
            column.map(el => 
                Column.findOne({ where: { uuid: el.uuid }})
                .then(col => col.update({ columnPriority: el.columnPriority })))
        ])
    },

    delete: function (uuid) {
        return Column.destroy({ where: { uuid: uuid }})
    }
}