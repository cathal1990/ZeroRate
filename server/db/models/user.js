require('dotenv').config();
const jwt = require('jsonwebtoken');
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

User.prototype.generateToken = async function () {
    try {
      const token = await jwt.sign({ username: this.username, id: this.id }, process.env.ACCESS_TOKEN_SECRET);
      return { token };
    } catch (err) {
      console.error(err);
    }
  };

User.byToken = async function(token) {
    try {
        const payload = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if (payload) {
        //find user by payload which contains the user id
        const user = await User.findByPk(payload.id);
        return user;
        }
        const error = Error("Invalid Username or password");
        error.status = 401;
        throw error;
    } catch (ex) {
        const error = Error("Invalid Username or password");
        error.status = 401;
        throw error;
    }
};

User.authenticate = async({username, password}) => {
    const user = await User.findOne({
        where: {
            username,
            password
        }
    })

    if (user) { return user }

    const error = Error('Invalid Username or password');
        throw error;
}

module.exports = { User }