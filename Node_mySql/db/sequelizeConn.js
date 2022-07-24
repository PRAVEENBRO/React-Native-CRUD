const { Sequelize, DataTypes } = require('sequelize')


// DATA BASE CONNECTION
const sequelize = new Sequelize('freshlite4', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: { max: 5, min: 0, idle: 10000 }
});

sequelize.authenticate()
    .then(() => { console.log('connected') })
    .catch(err => { console.log('Not connected' + err) })


// CREATING SCHEMA

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sequelize.sync({ force: false })
    .then(() => console.log('sync'))
    .catch(err => console.log('error'))


// IMPORTING SCHEMA
db.users = require('../model/userSchema.js')(sequelize, DataTypes)
db.Register = require('../model/registerSchema')(sequelize, DataTypes)

module.exports = db