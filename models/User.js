module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        firstName: {
            type:DataTypes.STRING,
            allowNull: false
        },
        middleName: {
            type:DataTypes.STRING,
            allowNull: false,

        },
        lastName: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        address: {
            type:DataTypes.STRING,
            allowNull: false,
        }

    })
    return user
}