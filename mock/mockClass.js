const Mock = require('mockjs')
const Class = require('../models/Class')
const classes = Mock.mock({
  'list|16': [{
      'id|+1': 1,
      name: '终极 @id 班',
      openDate: '@date'
  }]
})
Class.bulkCreate(classes.list)