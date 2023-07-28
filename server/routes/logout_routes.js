// this will contain the logout routes
const express = require('express')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

require('dotenv').config()

router.post('/logout', async (req, res) => {
  const token = req.cookies.token
  if (token) res.clearCookie('token')
  res.status(200).json({ message: 'Logged out' })
})
module.exports = router;