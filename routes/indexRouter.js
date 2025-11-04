const { Router } = require("express");
const indexRouter = Router();
const messagesController = require("../controllers/messagesController");
const usersController = require("../controllers/usersController");
indexRouter.get(
  "/message-board",
  messagesController.showMessageBoardForUnauthorizedUserGet
);
indexRouter.get("/", (req, res) => {
  res.render("log-in");
});
indexRouter.get("/sign-up", (req, res) => {
  res.render("sign-up", { errors: [] });
});
indexRouter.post(
  "/",
  usersController.validateSignUpForm,
  usersController.addUserPost
);
indexRouter.get("/:id/delete", messagesController.deleteMessageGet);
module.exports = indexRouter;
