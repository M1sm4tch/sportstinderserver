const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session'); 
require('./auth');
dotenv.config();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 2000; 
const PUBLIC_URL = process.env.PUBLIC_URL;

app.get('/', (req,res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',passport.authenticate('google',{scope:['email','profile']}))

app.get('/auth/google/callback',
    passport.authenticate('google',  {
        successRedirect:'/protected',
        failureRedirect:'/auth/failure',
    })
);

app.get('/auth/failure',(req,res)=>{
    res.send('something went wrong..')
})

app.get('/protected',isLoggedIn,(req,res)=>{
    res.send(`Hello! ${req.user.displayName}`);
});

app.get('/logout', (req,res) => {
    req.logout(function() {
        console.log('logged out')
      });
    res.send('Goodbye!');
})

app.listen(PORT,()=>{console.log(`${PUBLIC_URL}${PORT}`)})