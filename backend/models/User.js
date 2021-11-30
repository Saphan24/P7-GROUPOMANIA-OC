const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db.config');

const User = sequelize.define('User', {
    id: { 
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    nom: {
        allowNull: false,
        type: DataTypes.STRING
    },
    prénom: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: true,
        type: DataTypes.STRING
    },
    email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    isAdmin: {
        defaultValue: false,
        allowNull: false,
        type: DataTypes.BOOLEAN
    }
});

User.sync()
.then(() => console.log('La table User a été créée dans la base de données'))
.catch(error => console.error('Une erreur est survenue', error));

module.exports = User;