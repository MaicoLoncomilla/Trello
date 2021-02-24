const { Task, Column, Comment, User, ImageTask } = require('../db.js')
const column = require('./column')
module.exports = {

    create: function (title, columnUuid, uuid, taskPriority) {
        
            return Task.create({
                title: title,
                description: '',
                uuid: uuid,
                columnUuid: columnUuid,
                taskPriority: taskPriority
            })
    },

    addMember: function(email, dashboardUuid, uuid){

        return Promise.all([
            User.findOne({
                where: { email: email }
            }),
            Task.findOne({
                where: { uuid: uuid }
            })
        ])
        .then(([user, task]) => task.addUser(user))
        .then(() => column.read(dashboardUuid))
    },

    addCoverImage: function (uuid, dashboardUuid, img) {
        let taskPromise = Task.findOne({ where: { uuid: uuid }});
        let imagePromise = ImageTask.findOrCreate({
            where: { fileName: img.filename }
        })
            .then(r => r[0])
        return Promise.all([taskPromise, imagePromise])
            .then(([task, image]) => task.setImageTask(image))
            .then(() => column.read(dashboardUuid))
    },

    update: function (uuid, title, description) {
        return Task.findOne({where: { uuid: uuid }})
            .then(task => task.update({ title, description }))
    },
    reorderUpdate: function (tasks) {
        tasks.map((el, index) => {
            let taskPriority = el.taskPriority
            return Task.findOne({
                where: { uuid: el.uuid }
            })
                .then(task => task.update({ taskPriority }))
        })
    },
    delete: function (uuid) {
        return Task.destroy({ where: { uuid: uuid }})
    }
}