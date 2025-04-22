const User = require('../models/user')
const jwt = require('jsonwebtoken')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400)
      throw new Error('Missing fields')
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(409)
      throw new Error('Email already taken')
    }

    const user = new User({ name, email, password })
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(403)
      throw new Error('Wrong email or password')
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, loginUser }