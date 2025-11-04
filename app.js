require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./passport-config");
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
const indexRouter = require("./routes/indexRouter");

const app = express();
/*use imported passport*/
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

/*look and render ejs files*/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*serve static file from specific folder*/
app.use(express.static(assetsPath));

/*read form submissions and use it values*/
app.use(express.urlencoded({ extended: true }));

/*use router*/
app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
