require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../database')
const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

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
        const error = Error("Bad credentials");
        error.status = 401;
        throw error;
    } catch (e) {
        const error = Error("Bad credentials");
        error.status = 401;
        throw error;
    }
};

User.authenticate = async({username, password}) => {
    try{
        const user = await User.findOne({
            where: {
                username,
            }
        })

        if (user) {
            const match = await bcrypt.compare(password, user.password);

            return match ? user : null
        }

        const error = Error("Invalid Username or password");
        error.status = 404;
        throw error;
    }
    catch(err) {
        console.log(err)
    }

}

User.addHook('beforeCreate', async(user)=> {
    if(user.changed('password')){
      user.password = await bcrypt.hash(user.password, 5);
    }
  });

module.exports = { User }