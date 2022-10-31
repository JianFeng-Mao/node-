const { DataTypes } = require('sequelize')
const sequelize =  require('./db.js')
const moment = require("moment");

module.exports = sequelize.define('Student', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      return moment(this.getDataValue('birthday')).format('YYYY-MM-DD');
    }
  },
  age: {
    type: DataTypes.VIRTUAL,
    get() {
      const now = moment.utc();
      const birth = moment.utc(this.birthday);
      return now.diff(birth, 'y')
    }
  },
  sex: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    get() {
      const sex = this.getDataValue('sex');
      return sex === 1 ? '男' : '女'
    }
  },
  phone: {
    type: DataTypes.STRING(11),
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  paranoid: true
})