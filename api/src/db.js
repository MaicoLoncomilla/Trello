require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

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
const { Avatar, Done, Group, InProcess, InQueue, Review, TableList, User } = sequelize.models;

// Aca vendrian las relaciones
// User 1 <-----> N TableList
User.hasMany(TableList)
TableList.belongsTo(User)

// Avatar 1 <-----> 1 User
Avatar.hasOne(User)
User.belongsTo(Avatar)

// User N <-----> N Group (ver esto)
User.belongsToMany(Group, { through: 'userGroup' })
Group.belongsToMany(User, { through: 'userGroup' })

// TableList 1 <-----> N Group
TableList.hasOne(Group)
Group.belongsToMany(TableList, { through: 'groupTableList' })

// Listas
// TableList 1 <-----> 1 InQueue
TableList.hasMany(InQueue)
InQueue.belongsTo(TableList)

// TableList 1 <-----> N InProcess
TableList.hasMany(InProcess)
InProcess.belongsTo(TableList)

// TableList 1 <-----> N Review
TableList.hasMany(Review)
Review.belongsTo(TableList)

// TableList 1 <-----> N Done
TableList.hasMany(Done)
Done.belongsTo(TableList)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
