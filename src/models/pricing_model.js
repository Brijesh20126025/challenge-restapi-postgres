const uuid = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const PricingModel = sequelize.define('pricing_model', {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: uuid.v4()
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pricing: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: true,
        },
    }, { freezeTableName: true });

    return PricingModel;
};