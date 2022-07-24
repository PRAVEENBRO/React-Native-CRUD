module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER, primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        place: DataTypes.STRING,
        phone: DataTypes.INTEGER

    }, {
        timestanp: false,
        updatedAt: false,
        createdAt: false,
    });
    return Users
}




