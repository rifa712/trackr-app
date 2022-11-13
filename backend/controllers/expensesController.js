const asyncHandler = require('express-async-handler')

// Model
const Expenses = require('../models/expensesModel')
const Allocation = require('../models/allocationModel')

// @desc    GET expenses allocation
// @route   GET /api/expenses
// @access  Private
const getExpenses = asyncHandler(async (req, res) => {
  const allocation = await Allocation.findById(req.params.allocationId)

  if (allocation.user !== req.user) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const expenses = await Expenses.find({ allocation: req.params.allocationId })

  res.status(200).json(expenses)
})

// @desc    CREATE new allocation
// @route   POST /api/allocations
// @access  Private
const createExpenses = asyncHandler(async (req, res) => {
  // Check user
  const allocation = await Allocation.findById(req.params.allocationId)

  if (allocation.user !== req.user) {
    res.status(401)
    throw new Error('User not authorized')
  }

  // Create an expenses
  const { user, expensesTitle, expensesAmount } = req.body

  if ((!user, !expensesTitle || !expensesAmount)) {
    res.status(400)
    throw new Error('Please add a Title, Description and Initial Amount')
  }

  const expenses = await Expenses.create({
    user,
    allocation: req.params.allocationId,
    expensesTitle,
    expensesAmount,
  })

  res.status(200).json(expenses)
  // res.status(200).json({ message: 'expenses' })
})

// @desc    DELETE expenses
// @route   DELETE /api/allocations
// @access  Private
const deleteExpenses = asyncHandler(async (req, res) => {
  // Check user
  const expenses = await Expenses.findById(req.params.expensesId)

  if (!expenses) {
    res.status(404)
    throw new Error('Ticket not found')
  }

  if (expenses.user !== req.user) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await expenses.remove()

  res.status(200).json({ message: 'deleted successfully' })
})

module.exports = {
  createExpenses,
  getExpenses,
  deleteExpenses,
}
