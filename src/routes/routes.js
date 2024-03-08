const express = require('express');
const passport = require('passport');
const isLoggedIn = require('../middleware/middleware'); 

const router = express.Router();

router.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure',
  })
);

router.get('/auth/failure', (req, res) => {
  res.send('something went wrong..');
});

router.get('/protected', isLoggedIn, (req, res) => {
  console.log(req.user);
  res.send(`Hello! ${req.user.displayName}`);
});

router.get('/logout', (req, res) => {
  req.logout(() => {
    console.log('logged out')
  });
  res.send('Goodbye!');
});

module.exports = router;
