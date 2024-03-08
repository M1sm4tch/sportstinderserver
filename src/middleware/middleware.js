function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.send('Unauthorized');
    }
  }
  
module.exports = isLoggedIn;