const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('task', {
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING(5000)
        },
        taskPriority: {
            type: DataTypes.INTEGER
        },
        uuid: {
            type: DataTypes.STRING
        }
    })
}