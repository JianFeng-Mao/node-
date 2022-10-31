const Admin = require('../models/Admin');
const { md5 } = require('md5js');
const addAdmin = async function(loginId, loginPwd) {
  loginPwd = md5(loginPwd)
  const ins = await Admin.create({
    loginId,
    loginPwd
  })
  return JSON.stringify(ins)
}

const login = async function(loginId, loginPwd) {
  loginPwd = md5(loginPwd)
  const result = await Admin.findOne({
    where: {
      loginId,
      loginPwd
    }
  })
  if(result && result.loginPwd === loginPwd) {
    return result.toJSON();
  }
  return null;
}

const deleteAdmin = async function(id) {
  // 先找到对应的实例
  // const ins = await Admin.findByPk(id)
  // if(ins) {
  //   // 存在即删除该实例
  //   ins.destroy()
  // }

  const result = await Admin.destroy({
    where: {
      id
    }
  })
  return result
}

const updateAdmin = async function(id, adminObj) {
  // 先找到对应实例
  // const ins = await Admin.findByPk(id);
  // let result;
  // if(ins) {
  //   result = await ins.update(adminObj)
  // }
  // return result
  if(adminObj.loginPwd) {
    adminObj.loginPwd = md5(adminObj.loginPwd)
  }
  const result = await Admin.update(adminObj, {
    where: {
      id
    }
  })
  return result
}

const getAdmin = async function(id) {
  const result = await Admin.findByPk(id)
  if(result) {
    return result.toJSON()
  }
  return {}
}

const getAdmins = async function({name, page, size}) {
  const whereFilter = name ? {loginId: name} : {}
  const { count, rows } = await Admin.findAndCountAll({
    where: whereFilter,
    limit: +size,
    offset: (page - 1) * size
  })
  return {
    total: count,
    list: JSON.parse(JSON.stringify(rows))
  }
}

module.exports = {
  deleteAdmin,
  addAdmin,
  updateAdmin,
  login,
  getAdmin,
  getAdmins
}