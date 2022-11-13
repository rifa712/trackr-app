const express = require('express')
const {
  getExpenses,
  createExpenses,
  deleteExpenses,
} = require('../controllers/expensesController')
const router = express.Router({ mergeParams: true })
// Middleware
const { protect } = require('../middleware/authMiddleware')

router.route('/:expensesId').delete(protect, deleteExpenses)
router.route('/').get(protect, getExpenses).post(protect, createExpenses)

module.exports = router
