const db = require('../database')
const Sequelize = require('sequelize')

const user = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmpty: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        isEmpty: false
    },
})

module.exports = user