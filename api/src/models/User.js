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
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return () => this.getDataValue("password");
      },
    },
    salt: {
      type: DataTypes.STRING,
      get() {
        return () => this.getDataValue("salt");
      },
    },
  });
};
