const { DataTypes } = require('sequelize')
const sequelize =  require('./db.js')

module.exports = sequelize.define('Admin', {
  loginId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  loginPwd: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true
})