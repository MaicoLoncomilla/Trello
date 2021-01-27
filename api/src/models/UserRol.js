const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('userRol', {
        state: {
            type: DataTypes.ENUM({
                values:['owner', 'edit', 'guest'],
                defaultValue: "guest"
            }) 
        }
    })
}