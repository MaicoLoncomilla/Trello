const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('user', {
    name: {
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
  });
};
