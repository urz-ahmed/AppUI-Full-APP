const express = require('express') // require express
// make an app object by calling express function
const app = express()
const mongoose = require('mongoose')
// set the port
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 5000
const cors = require('cors')
// const bcrypt = require('bcryptjs')
// const bcryptSalt = bcrypt.genSaltSync(8)

require('dotenv').config()
app.use(express.json())

app.use((_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cookieParser())

// connect to database
app.use(express.urlencoded({ extended: true }))
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Event listener for successful connection
mongoose.connection.on('connected', () => {
  console.log('Database connection successful') // Display notification
})
// routes for diffrent actions

// app.use(require('./routes/home')) // home page

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to the home page' })
})
app.get('/test', (req, res) => {
  res.send('Server is working');
});


app.use(require('./routes/login_routes')) // login page
app.use(require('./routes/logout_routes')) // logout page
app.use(require('./routes/signup_routes')) // signup page
app.use(require('./routes/question_routes')) // question page
app.use(require('./routes/admin_routes')) // admin page
app.use(require('./routes/preflight_routes')) // admin page

app.listen(port, (err) => {
  if (err) {
    console.log(err)
  } else console.log(`server is running on port ${port}`)
})
