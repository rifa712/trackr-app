const asyncHandler = require('express-async-handler')
const admin = require('../config/firebase-admin.config')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // GET token from header
      token = req.headers.authorization.split(' ')[1]

      //   Verify the token
      const decoded = await admin.auth().verifyIdToken(token)

      req.user = decoded.uid
      if (decoded) {
        next()
      } else {
        throw new Error('Not authirized')
      }
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

module.exports = { protect }
