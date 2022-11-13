const asyncHandler = require('express-async-handler')

// Model
const Allocation = require('../models/allocationModel')
const Expenses = require('../models/expensesModel')

// @desc    GET all allocations
// @route   GET /api/allocations
// @access  Private
const getAllocations = asyncHandler(async (req, res) => {
  const allocations = await Allocation.find({ user: req.user })

  res.status(200).json(allocations)
})

// @desc    GET user allocation
// @route   GET /api/allocations/:id
// @access  Private
const getAllocation = asyncHandler(async (req, res) => {
  const allocation = await Allocation.findById(req.params.id)

  if (!allocation) {
    res.status(404)
    throw new Error('Allocation not found')
  }

  if (allocation.user !== req.user) {
    res.status(401)
    throw new Error('Not authorized')
  }

  res.status(200).json(allocation)
})

// @desc    CREATE new allocation
// @route   POST /api/allocations
// @access  Private
const createAllocation = asyncHandler(async (req, res) => {
  // Create aa allocation
  const { user, allocationTitle, allocationAmount, allocationDescription } =
    req.body

  if (
    !user ||
    !allocationTitle ||
    !allocationAmount ||
    !allocationDescription
  ) {
    res.status(400)
    throw new Error('Please add a Title, Description and Initial Amount')
  }

  const allocation = await Allocation.create({
    user,
    allocationTitle,
    allocationDescription,
    allocationAmount,
  })

  res.status(200).json(allocation)
})

// @desc    UPDATE user allocation
// @route   PUT /api/allocations/:id
// @access  Private
const updateAllocation = asyncHandler(async (req, res) => {
  const allocation = await Allocation.findById(req.params.id)

  if (!allocation) {
    res.status(404)
    throw new Error('Allocation not found')
  }

  if (allocation.user !== req.user) {
    res.status(401)
    throw new Error('Not authorized')
  }

  const update = await Allocation.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(update)
})

// @desc    DELETE user allocation
// @route   DELETE /api/allocations/:id
// @access  Private
const deleteAllocation = asyncHandler(async (req, res) => {
  const allocation = await Allocation.findById(req.params.id)

  if (!allocation) {
    res.status(404)
    throw new Error('Allocation not found')
  }

  if (allocation.user !== req.user) {
    res.status(401)
    throw new Error('Not authorized')
  }

  await Expenses.deleteMany({ allocation: req.params.id })
  await allocation.remove()

  res.status(200).json({ success: true })
})

module.exports = {
  getAllocations,
  getAllocation,
  createAllocation,
  updateAllocation,
  deleteAllocation,
}
