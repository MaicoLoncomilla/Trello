const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('column', {
        title: {
            type: DataTypes.STRING,
        },
        columnPriority: {
            type: DataTypes.INTEGER
        },
        uuid: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    })
}