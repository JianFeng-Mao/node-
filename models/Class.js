const { DataTypes } = require('sequelize')
const sequelize =  require('./db.js')
const Student = require('./Student')
const moment = require('moment')

const Class = sequelize.define('Class', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  openDate: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const openDate = this.getDataValue('openDate');
      return moment(openDate).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true
})

module.exports = Class;