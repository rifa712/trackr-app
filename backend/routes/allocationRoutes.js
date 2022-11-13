const express = require('express')
const router = express.Router()
const {
  getAllocations,
  getAllocation,
  createAllocation,
  updateAllocation,
  deleteAllocation,
} = require('../controllers/allocationController')
// Middleware
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllocations).post(protect, createAllocation)
router
  .route('/:id')
  .get(protect, getAllocation)
  .put(protect, updateAllocation)
  .delete(protect, deleteAllocation)

// Re Route into noteRouter
const expensesRoute = require('./expensesRoutes')
router.use('/:allocationId/expenses', expensesRoute)

module.exports = router
