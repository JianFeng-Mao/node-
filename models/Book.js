const { DataTypes } = require('sequelize')
const sequelize =  require('./db.js')

module.exports = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imgUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishDate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  paranoid: true
})