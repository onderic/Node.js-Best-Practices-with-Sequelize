const fs = require('fs');
const path = require('path');
const { Sequelize } = require("sequelize");
const logger = require("../log/logger");
const dbConfig = require("../../configs");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  pool: {
    max: dbConfig.POOL.max,
    min: dbConfig.POOL.min,
    acquire: dbConfig.POOL.acquire,
    idle: dbConfig.POOL.idle,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize.authenticate()
  .then(() => {
    logger.info('Connection to the database has been established successfully.');
  })
  .catch((error) => {
    logger.error('Unable to connect to the database:', error);
  });

const domainsDir = path.join(__dirname, '../../domains');

fs.readdirSync(domainsDir).forEach((domain) => {
  const modelPath = path.join(domainsDir, domain, 'model.js');
  
  if (fs.existsSync(modelPath)) {
    const model = require(modelPath)(sequelize, Sequelize);
    db[model.name] = model;
  }
});


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
