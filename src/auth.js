const passport = require('passport');
const dotenv = require('dotenv');
const User = require('./models/userModel')

dotenv.config();

const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const PUBLIC_URL = process.env.PUBLIC_URL;
const PORT = process.env.PORT;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${PUBLIC_URL}${PORT}/auth/google/callback`, // Corrected callback URL
    passReqToCallback: true
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {

      let user = await User.findOne({ email: profile.emails[0].value });

      if (!user) {
        user = new User({
          email: profile.emails[0].value,
          username: profile.displayName,  
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          password: 'password',
          displayName: profile.displayName,
        });
        await user.save();
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

