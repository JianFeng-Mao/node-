const moment = require('moment');
const validate = require('validate.js');

validate.extend(validate.validators.datetime, {
  // 在验证时自动触发，将datetime类型数据转换为时间戳返回
  parse(value, options) {
    let formats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD H:m:s', 'x']
    if(options.dateOnly) {
      formats = ['YYYY-MM-DD', 'YYYY-M-D', 'x']
    }
    return +moment.utc(value, formats, true)
  },
  // 用户显示错误消息时，使用的显示字符串
  format(value, options) {
    let format = 'YYYY-MM-DD'
    if(!options.dateOnly) {
      format += ' HH:mm:ss'
    }
    return moment.utc(value).format(format);
  }
})