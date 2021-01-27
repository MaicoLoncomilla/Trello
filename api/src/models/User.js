const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Email address already in use!"
      },
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    avatarUri: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['fileName']),
      get() {
        return `/image/${this.get('fileName')}`;
      },
      set() {
        throw new Error(`Do not try to set the 'url' value!`);
      }
    }
  });
};
