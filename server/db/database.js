const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/zero_rate', { logging: false });

module.exports = db;

//do not touch!!!