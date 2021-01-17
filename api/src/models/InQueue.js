const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('inQueue', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        }
    })
}