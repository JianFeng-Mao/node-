const { Op } = require('sequelize');
const Class = require('../models/Class');
const moment = require('moment')
const addClass = async function(classObj) {
  const ins = await Class.create(classObj)
  return JSON.stringify(ins)
}

const deleteClass = async function(id) {
  const result = await Class.destroy({
    where: {
      id
    }
  })
  return result
}

const updateClass = async function(id, classObj) {
  const result = await Class.update(classObj, {
    where: {
      id
    }
  })
  return result
}

const getClass = async function(id) {
  const result = await Class.findByPk(id);
  if(result) {
    return result.toJSON();
  }
  return {}
}

const getClasses = async function({name, startTime, endTime, page, size}) {
  const whereFilter = {};
  if(name) {
    whereFilter.name = name;
  }
  if(startTime && endTime) {
    whereFilter.openDate = {
      [Op.lte]: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
      [Op.gte]: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
    }
  }
  const { count, rows } = await Class.findAndCountAll({
    where: {
      ...whereFilter
    },
    offset: (page - 1) * size,
    limit: +size
  });
  return {
    total: count,
    list: JSON.parse(JSON.stringify(rows))
  };
}

module.exports = {
  deleteClass,
  addClass,
  updateClass,
  getClass,
  getClasses
}