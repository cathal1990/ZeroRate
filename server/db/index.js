// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database')
const User = require('./models/user')
const seed = require('./seed.json')

const syncAndSeed = async () => {
    await db.sync({ force: true });

    //use this area to sync your database
    await Promise.all(seed.map((user) => {User.create(user)}));

    console.log(`
    🌱 Seeding successful! 🌱
  `);
};

module.exports = {
    // Include your models in this exports object as well!
    db,
    syncAndSeed,
    models: {
      User
    }
}