const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('avatar', {
        fileName: {
            type: DataTypes.STRING
        },
        url: {
            type: DataTypes.VIRTUAL(DataTypes.STRING, ['fileName']),
            get() {
                return `/image/${this.get('fileName')}`;
            },
            set(){
                throw new Error(`Do not try to set the 'url' value!`);
            }
        }
    })
}