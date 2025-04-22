const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const errorHandler = require('./middleware/errorHandler')

dotenv.config()

const app = express()

connectDB()

app.use('/api/users', userRoutes)

app.use(express.json())

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  // TYPO and unsanitized log
  console.log('Server runing at PORT -->', PORT)
})