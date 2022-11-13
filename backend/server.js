const express = require('express')
const path = require('path')
const app = express()
require('colors')
require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')

// PORT
const PORT = process.env.PORT || 5000

// DB
const connectDB = require('./config/db')
connectDB()

// Midddleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/allocations', require('./routes/allocationRoutes'))
app.use('/api/expenses', require('./routes/expensesRoutes'))

// Serve FE
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Trackr API' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on PORT : ${PORT}`))
