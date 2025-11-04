const { Router } = require("express");
const indexRouter = Router();
const messagesController = require("../controllers/messagesController");

indexRouter.get("/", messagesController.showMessageBoardForAuthorizedUserGet);
indexRouter.get("/log-in", (req, res) => {
  res.render("log-in");
});
indexRouter.get("/sign-up", (req, res) => {
  res.render("sign-up");
});
module.exports = indexRouter;
