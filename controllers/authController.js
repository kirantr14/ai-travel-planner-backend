const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
  try {
    const {name, email, password} = req.body

    const existingUser = await User.findOne({email})

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    })

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (!user) {
      return res.status(400).json({
        message: 'Invalid email or password',
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
      })
    }

    const token = jwt.sign(
        {
            userId: user._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '7d',
        }
        )

        res.json({
        message: 'Login successful',
        token,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = {
  registerUser,
  loginUser,
}