require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
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

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Column, Dashboard, Task, User, UserRol, Image, Comment, ImageTask } = sequelize.models;

// Aca vendrian las relaciones
// User N <-----> M Dashboard
User.belongsToMany(Dashboard, { through: UserRol })
Dashboard.belongsToMany(User, { through: UserRol })

// User 1 <-----> 1 Image
User.hasOne(Image)
Image.belongsTo(User)

// Dashboard 1 <-----> N Column
Dashboard.hasMany(Column)
Column.belongsTo(Dashboard)

// Column 1 <-----> N Task
Column.hasMany(Task)
Task.belongsTo(Column)

// Task 1 <-----> N Comment
Task.hasMany(Comment)
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

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
