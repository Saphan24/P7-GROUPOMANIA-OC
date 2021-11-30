const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

database
  .authenticate()
  .then(() =>
    console.log("Vous êtes maintenant connecté à la base de données !")
  )
  .catch((err) => console.log("erreur d'authentification: " + err));

module.exports = { sequelize };