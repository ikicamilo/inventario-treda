const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize({
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  port: config.db.port,
  host: config.db.host,
  dialect: "mysql",
});

module.exports = sequelize;
