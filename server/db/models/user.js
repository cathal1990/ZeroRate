const db = require('../database')
const Sequelize = require('sequelize')

const User = db.define('user', {
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

User.prototype.generateToken = function() {
    return { token: this.id }
}

User.byToken = async(token) => {
    try{
        const user = await User.findByPk(token);
        if(user) { return user }

        const error = Error('Bad credentials')
        error.or.status = 401;
        throw error;
    }
    catch{
        const error = Error('Bad credentials')
        error.or.status = 401;
        throw error;
    }
}

User.authenticate = async({username, password}) => {
    const user = await User.findOne({
        where: {
            username,
            password
        }
    })

    if (user) { return user.id }

    const error = Error('Bad credentials')
        error.or.status = 401;
        throw error;
}

module.exports = { User }