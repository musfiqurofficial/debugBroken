const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB Connected')
  } catch (err) {
    console.log('Database failed to connect.')
    process.exit(1)
  }
}

module.exports = connectDB
