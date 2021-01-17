const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        avatar: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.DOUBLE,
            allowNull: false,
            unique: true
        }
    })
}