require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Column, Dashboard, Task, User, UserRol, Image, Comment, ImageTask } = sequelize.models;

// User N <-----> M Dashboard
User.belongsToMany(Dashboard, { through: UserRol })
Dashboard.belongsToMany(User, { through: UserRol })

// User 1 <-----> 1 Image
User.hasOne(Image)
Image.belongsTo(User)

// Dashboard 1 <-----> N Column
Dashboard.hasMany(Column, { onDelete: "CASCADE"})
Column.belongsTo(Dashboard)

// Column 1 <-----> N Task
Column.hasMany(Task, { onDelete: "CASCADE"})
Task.belongsTo(Column)

// Task 1 <-----> N Comment
Task.hasMany(Comment, { onDelete: "CASCADE"})
Comment.belongsTo(Task)

// User 1 <-----> N Comment
User.hasMany(Comment)
Comment.belongsTo(User)

// Task M <-----> N User
Task.belongsToMany(User, { through: 'Member' })
User.belongsToMany(Task, { through: 'Member' })

// Task 1 <-----> 1 Image
Task.hasOne(ImageTask)
ImageTask.belongsTo(Task)


User.generateSalt = function () {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(plainText)
    .update(salt)
    .digest("hex");
};

const setSaltAndPassword = (user) => {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password(), user.salt());
  }
};

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

User.prototype.correctPassword = function (enteredPassword) {
  return User.encryptPassword(enteredPassword, this.salt()) === this.password();
};

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};