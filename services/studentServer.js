const { Op } = require('sequelize');
const validate = require('validate.js');
const moment = require('moment');
const Class = require('../models/Class');
const Student = require('../models/Student');
const { filterAttrs } = require('../utils')
const addStudent = async function(studentObj) {
  studentObj = filterAttrs(studentObj, 'name', 'sex', 'phone', 'ClassId', 'birthday')
  validate.validators.classExist = async function (value) {
    const c = await Class.findByPk(value);
    if (c) {
      return;
    }
    return "is not exist";
  };
  const rules = {
    name: {
      presence: {
        allowEmpty: false
      },
      type: 'string',
      length: {
        minimum: 2,
        maximum: 10
      }
    },
    birthday: {
      presence: {
        allowEmpty: false
      },
      datetime: {
        dateOnly: true,
        earliest: +moment.utc().subtract(100, 'y'),
        latest: +moment.utc().subtract(5, 'y')
      }
    },
    sex: {
      presence: true,
      type: 'boolean'
    },
    phone: {
      presence: {
        allowEmpty: false
      },
      format: /^1\d{10}/
    },
    ClassId: {
      presence: true,
      numericality: {
        onlyInteger: true,
        strict: false
      },
      classExist: true
    }
  }
  await validate.async(studentObj, rules);
  const ins = await Student.create(studentObj)
  return ins.toJSON();
}

const deleteStudent = async function(id) {
  const result = await Student.destroy({
    where: {
      id
    }
  })
  return result
}

const updateStudent = async function(id, studentObj) {
  const result = await Student.update(studentObj, {
    where: {
      id
    }
  })
  return result
}

const getStudent = async function(id) {
  const result = await Student.findByPk(id)
  if(result) {
    return result.toJSON()
  }
  return {}
}

const getStudents = async function({name, sex = -1, classId, page, size}) {
  const whereFilter = {}
  if(name) {
    whereFilter.name = {
      [Op.like]: `%${name}%` 
    }
  }
  if(sex) {
    whereFilter.sex = !!sex
  }
  if(classId) {
    whereFilter.ClassId = classId
  }
  const { count, rows } = await Student.findAndCountAll({
    attributes: ['id', 'name', 'birthday', 'age', 'sex', 'phone'],
    include: [Class],
    where: {
      ...whereFilter
    },
    offset: (page - 1) * size,
    limit: +size
  })
  return {
    total: count,
    list: JSON.parse(JSON.stringify(rows))
  }
}

module.exports = {
  deleteStudent,
  addStudent,
  updateStudent,
  getStudents,
  getStudent
}