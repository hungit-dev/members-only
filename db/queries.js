const pool = require("./pool");

const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.id,title,text,timestamp,first_name,last_name FROM messages INNER JOIN users ON messages.user_id=users.id"
  );
  return rows;
};
const deleteMessage = async (messageId) => {
  await pool.query("DELETE FROM messages WHERE id=$1", [messageId]);
};
const addUser = async (firstName, lastName, username, password) => {
  await pool.query(
    "INSERT INTO users(first_name,last_name,username,password) VALUES($1,$2,$3,$4)",
    [firstName, lastName, username, password]
  );
};
const searchUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  return rows;
};
module.exports = {
  getAllMessages,
  deleteMessage,
  addUser,
  searchUserByUsername,
};
