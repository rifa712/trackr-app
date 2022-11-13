const mongoose = require('mongoose')

const allocationSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    allocationTitle: {
      type: String,
      required: [true, 'Please insert a title for the allocation'],
    },
    allocationDescription: {
      type: String,
      required: [true, 'Please insert a description for the allocation'],
    },
    allocationAmount: {
      type: Number,
      required: [true, 'Please add some amount'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Allocation', allocationSchema)
