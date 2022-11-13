const mongoose = require('mongoose')

const aexpensesSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    allocation: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Allocation',
    },
    expensesTitle: {
      type: String,
      required: [true, 'Please insert a title for the expenses'],
    },
    expensesAmount: {
      type: Number,
      required: [true, 'Please add some amount'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Expenses', aexpensesSchema)
