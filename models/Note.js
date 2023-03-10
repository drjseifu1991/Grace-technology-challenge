module.exports = (sequelize, DataTypes) => {
    const note = sequelize.define('note', {
        date: {
            type:DataTypes.DATEONLY,
            allowNull: false,
        },
        time: {
            type:DataTypes.STRING,
        },
        dayOfTheWeek: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        note: {
            type:DataTypes.STRING,
            allowNull: false,
        }

    })
    return note
}