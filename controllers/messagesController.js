const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const showMessageBoardGet = async (req, res) => {
  try {
    if (!req.user) {
      res.redirect("/");
      return;
    }
    const rows = await db.getAllMessages();
    const messages = [];
    if (req.user["membership_status"] == "n") {
      // show normal message board if user is not admin
      for (let message of rows) {
        if (message["user_id"] == req.user.id) {
          //show date and author's name if it is user's messages
          messages.push({
            id: message.id,
            text: message.text,
            title: message.title,
            timestamp: message.timestamp,
            fullName: message.first_name + " " + message.last_name,
          });
          continue;
        }
        messages.push({
          //do not show date and author's name if it is not user's messages
          text: message.text,
          title: message.title,
          timestamp: "Date unavailable",
          fullName: "Anonymous",
        });
      }
      res.render("message-board.ejs", {
        messages: messages,
        isAdmin: false,
        user: req.user,
      });
    } else {
      for (let message of rows) {
        messages.push({
          id: message.id,
          text: message.text,
          title: message.title,
          timestamp: message.timestamp,
          fullName: message.first_name + " " + message.last_name,
          user: req.user,
        });
      }
      res.render("message-board", {
        user: req.user,
        messages: messages,
        isAdmin: true,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};

const deleteMessageGet = async (req, res) => {
  try {
    const id = req.params.id;
    await db.deleteMessage(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
const addMessagePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("add-message-form", { errors: errors.array() });
    }
    await db.addMessage(req.body.title, req.body.message, req.user.id);
    res.redirect("/message-board");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
const validateAddMessageForm = [
  body("title").trim().notEmpty().withMessage("Title cannot be empty"),
  body("message").trim().notEmpty().withMessage("Message cannot be empty"),
];
module.exports = {
  showMessageBoardGet,
  deleteMessageGet,
  addMessagePost,
  validateAddMessageForm,
};
