const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('tableList', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        }
    })
}