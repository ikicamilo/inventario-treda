const { Sequelize } = require("sequelize");
const config = require("./config");

const sequelize = new Sequelize({
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  host: config.db.host,
  dialect: "mysql",
});

// const User = require("../entities/User");
// const Sede = require("../entities/Sede");

// User.associate({ Sede });
// Sede.associate({ User });

module.exports = sequelize;
