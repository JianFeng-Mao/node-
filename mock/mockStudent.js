const Mock = require('mockjs')
const Student = require('../models/Student')
const students = Mock.mock({
  'list|16': [{
      'id|+1': 1,
      name: '@cname',
      birthday: '@date',
      "sex|1-2": false,
      phone: /1\d{10}/,
      'ClassId|1-16': 0
  }]
})
Student.bulkCreate(students.list)