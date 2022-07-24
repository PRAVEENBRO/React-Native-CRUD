
module.exports = (sequelize, DataTypes) => {

    const egister = sequelize.define('register', {
        id: {
            type: DataTypes.INTEGER, primaryKey: true,
            autoIncrement: true,
        },

        email: {
            type: DataTypes.STRING, unique: true,
        },
        password: DataTypes.STRING,

    }, {
        timestanp: false,
        updatedAt: false,
        createdAt: false,
    });
    return egister
}