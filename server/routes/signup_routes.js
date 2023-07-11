const express = require('express')

const User = require('../models/User')

const router = express.Router()

const crypto = require('crypto')


const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString('hex')
  return secretKey
}

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
  try {
    // const { username, email, password } = req.body
    const { username,email, password } = req.body
    
    // Validate user input
    if (!email || !password ) {
      return res
        .status(400)
        .json({ message: ' Email and password are required.' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: 'Email already taken.' })
    }

    // Hash password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create a new user
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    // Generate auth token
    const JWT_SECRET = generateSecretKey()
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: '1d',
    })

    // Return token in response
    const getuser = await User.find({ userId: newUser._id })
    res.status(200).json({ token, user: getuser })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error.' })
  }
})

module.exports = router
