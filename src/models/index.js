const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require(`../../config.json`);
const db = {};
const defineTableRelationsForJoinQuery = function () {

    db.pricing_model.hasMany(db.price, {
        foreignKey: 'prices'
    });

    db.pricing_model.hasOne(db.machine, {
        foreignKey: 'pricing_model'
    });
};

let sequelize;
sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
        omitNull: true,
    },
);

fs.readdirSync(`${__dirname}`)
    .filter(
        file =>
            file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(`${__dirname}`, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

defineTableRelationsForJoinQuery();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;