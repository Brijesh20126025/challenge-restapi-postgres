
module.exports = (sequelize, DataTypes) => {
    const Prices = sequelize.define('price', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, { freezeTableName: true });

    return Prices;
};