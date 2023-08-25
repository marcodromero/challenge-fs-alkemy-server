const {Sequelize} = require('sequelize');

const db = new Sequelize('personal_budget', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = db;
