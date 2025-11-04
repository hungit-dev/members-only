const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const showMessageBoardForUnauthorizedUserGet = async (req, res) => {
  const rows = await db.getAllMessages();
  const messages = [];
  for (let message of rows) {
    messages.push({
      text: message.text,
      title: message.title,
      timestamp: "???",
      fullName: "Anonymous",
    });
  }
  res.render("message-board.ejs", { messages: messages, isAdmin: false });
};
const showMessageBoardForAuthorizedUserGet = async (req, res) => {
  const rows = await db.getAllMessages();
  const messages = [];
  for (let message of rows) {
    messages.push({
      id: message.id,
      text: message.text,
      title: message.title,
      timestamp: message.timestamp,
      fullName: message.first_name + message.last_name,
    });
  }
  res.render("message-board.ejs", { messages: messages, isAdmin: true });
};
const deleteMessageGet = async (req, res) => {
  const id = req.params.id;
  await db.deleteMessage(id);
  res.redirect("/");
};
module.exports = {
  showMessageBoardForUnauthorizedUserGet,
  showMessageBoardForAuthorizedUserGet,
  deleteMessageGet,
};
