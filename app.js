const dotenv = require("dotenv");
const connectDB = require("./config/db");
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require('./routes/userRoutes'); 
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGIN || '*' }));
app.use(express.json()); 

connectDB();

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running..."); 
});

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running at PORT ${PORT}`);
});