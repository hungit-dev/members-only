const db = require("../db/queries");

const showMessageBoardForUnauthorizedUserGet = async (req, res) => {
  try {
    const rows = await db.getAllMessages();
    console.log(rows);
    const messages = [];
    for (let message of rows) {
      if (message["user_id"] == req.user.id) {
        //show date and author's name if it is user's messages
        messages.push({
          id: message.id,
          text: message.text,
          title: message.title,
          timestamp: message.timestamp,
          fullName: message.first_name + message.last_name,
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
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
const showMessageBoardForAuthorizedUserGet = async (req, res) => {
  try {
    const rows = await db.getAllMessages();
    const messages = [];
    for (let message of rows) {
      messages.push({
        id: message.id,
        text: message.text,
        title: message.title,
        timestamp: message.timestamp,
        fullName: message.first_name + message.last_name,
        user: req.user,
      });
    }
    res.render("message-board.ejs", { messages: messages, isAdmin: true });
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
    await db.addMessage(req.body.title, req.body.message, req.user.id);
    res.redirect("/message-board");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
module.exports = {
  showMessageBoardForUnauthorizedUserGet,
  showMessageBoardForAuthorizedUserGet,
  deleteMessageGet,
  addMessagePost,
};
