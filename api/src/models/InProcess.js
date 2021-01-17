const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('inProcess', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        }
    })
}