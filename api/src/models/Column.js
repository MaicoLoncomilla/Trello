const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('column', {
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
    })
}