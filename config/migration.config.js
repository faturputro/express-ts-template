const Sequelize = require('sequelize');

// adjust as needed
const IDENTIFIER = Sequelize.BIGINT;

const PRIMARY_KEY = {
  type: IDENTIFIER,
  allowNull: false,
  autoIncrement: true,
  primaryKey: true,
};

module.exports = {
  IDENTIFIER,
  PRIMARY_KEY,
}
