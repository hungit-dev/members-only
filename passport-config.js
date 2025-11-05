const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/queries");
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const rows = await db.searchUserByUsername(username);
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: "No username found" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try {
    const rows = await db.searchUserById(id);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
module.exports = passport;
