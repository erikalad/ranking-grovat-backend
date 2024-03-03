const { Sequelize, Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(`postgres://ranking_pwvk_user:AxZazZEMLJsjg447zAbWXj7qJygHfcci@dpg-cnh9tqicn0vc73decvgg-a/ranking_pwvk`, {

// const sequelize = new Sequelize(`postgres://postgres:Prbm2244@localhost/ranking`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);
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

const Ranking = require('./models/Ranking')(sequelize, Sequelize.DataTypes);
// Después de cargar todos los modelos
Object.values(sequelize.models).forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

// Sincronización con la base de datos
sequelize.sync();
module.exports = {
  ...sequelize.models,
  conn: sequelize, Op
};
