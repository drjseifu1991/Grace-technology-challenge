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
            
        },
        address: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        uid: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        }

    })
    return user
}