const { Sequelize } = require('sequelize');
const { sqlLogger } = require('../logger')
const sequelize = new Sequelize('schooldb', 'root', 'm56142', {
  host: 'localhost',
  dialect: 'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
  logging: (msg) => {
    sqlLogger.debug(msg);
  }, 
});

module.exports = sequelize;