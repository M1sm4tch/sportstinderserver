const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const auth = require('./auth');  
const User = require('./models/userModel');  
const routes = require('./routes/routes');  
const connectToMongoDB = require('./db/db')
const cors = require('cors');



dotenv.config();

connectToMongoDB();

const app = express();

app.use(cors());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

const PORT = process.env.PORT || 2000;
const PUBLIC_URL = process.env.PUBLIC_URL;

app.listen(PORT, () => {
  console.log(`Server is running at ${PUBLIC_URL}${PORT}`);
});
