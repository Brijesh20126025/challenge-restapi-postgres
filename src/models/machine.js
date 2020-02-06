
module.exports = (sequelize, DataTypes) => {
    const Machines = sequelize.define('machine', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pricing_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, { freezeTableName: true });

    return Machines;
};