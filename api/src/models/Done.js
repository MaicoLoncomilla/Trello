const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('done', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        }
    })
}