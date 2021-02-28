const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

const User = require('../models/User');

const JWT_KEY = process.env.JWT_KEY;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_KEY
}

const passportMiddleware = passport => {
  passport.use(new JwtStrategy(options, async (payload, done) => {
    try {
      const user = await User.findById(payload.id).select('email id');
      user
        ? done(null, user)
        : done(null, false);
    } catch (e) {
      console.log(e);
    }
  }))
}

module.exports = passportMiddleware;