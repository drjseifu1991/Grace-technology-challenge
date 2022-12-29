const { Sequelize, DataTypes } = require('sequelize')
const user = require('../models/User.js')
const note = require('../models/Note.js')

const sequelize = new Sequelize(
    'grace_technology_challenge',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: '3306'
    }
)

const db = {}

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch( error => {
    console.error('Unable to connect to the database: ', error);
})

try {
    db.user = user(sequelize, DataTypes)
    db.note = note(sequelize, DataTypes)
    db.sequelize = sequelize

    // creating relationship
    db.note.belongsTo(db.user, {
        foreignKey: {
        allowNull: false
      }});
    db.user.hasMany(db.note)
} catch (error) {
    console.log('sequelize error while creating relationship', error);
}

module.exports = {db}