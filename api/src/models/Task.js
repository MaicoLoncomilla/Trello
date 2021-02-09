const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('task', {
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
        taskPriority: {
            type: DataTypes.INTEGER
        }
    })
}