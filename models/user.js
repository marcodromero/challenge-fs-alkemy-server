const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const db = require('../database/db-config');
const Balance = require('./balance');
const Operation = require('./operation');


const User = db.define('User', { 
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    email:{
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    state:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}  
);

User.hasMany(Balance, {foreignKey: 'userId'});
User.hasMany(Operation, {foreignKey: 'userId'});


module.exports = User;