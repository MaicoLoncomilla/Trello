const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('dashboard', {
        title: {
            type: DataTypes.STRING,
        },
        uuid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        dashboardPriority: {
            type: DataTypes.INTEGER
        }
    })
}