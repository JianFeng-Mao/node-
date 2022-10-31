const studentServe = require('../../services/studentServer');

const express = require('express');
const { asyncHandler } = require('../getSendResult');

const router = express.Router();

router.get(
  '/', 
  asyncHandler(async (req, res) => {
    const reqObj = {
      page: req.query.page || 1,
      size: req.query.size || 10
    }
    return await studentServe.getStudents(reqObj)
  })
)

router.get(
  '/:id', 
  asyncHandler(async (req, res) => {
    return await studentServe.getStudent(req.params.id)
  })
)

router.put(
  '/', 
  asyncHandler(async (req, res) => {
    return await studentServe.addStudent(req.body)
  })
)
router.delete(
  '/:id', 
  asyncHandler(async (req, res) => {
    return await studentServe.deleteStudent(req.params.id)
  })
)

module.exports = router