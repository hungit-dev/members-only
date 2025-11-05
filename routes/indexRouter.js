const { Router } = require("express");
const indexRouter = Router();
const passport = require("../passport-config.js");
const messagesController = require("../controllers/messagesController");
const usersController = require("../controllers/usersController");
indexRouter.get(
  "/message-board",
  messagesController.showMessageBoardForUnauthorizedUserGet
);
indexRouter.get("/add-message", (req, res) => {
  res.render("add-message-form");
});
// if user is not login, redirect them to login page. If user is logged in, redirect them to message board
indexRouter.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/message-board");
    return;
  }
  res.redirect("/log-in");
});
indexRouter.get("/log-in", (req, res) => {
  res.render("log-in", { error: req.flash("error") });
});
indexRouter.get("/sign-up", (req, res) => {
  res.render("sign-up", { errors: [] });
});
indexRouter.post(
  "/sign-up",
  usersController.validateSignUpForm,
  usersController.addUserPost
);
indexRouter.get("/:id/delete", messagesController.deleteMessageGet);
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/message-board",
    failureRedirect: "/log-in",
    failureFlash: true,
  })
);
indexRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
indexRouter.post("/add-message", messagesController.addMessagePost);
indexRouter.get("/get-membership", (req, res) => {
  res.render("get-membership");
});
module.exports = indexRouter;
