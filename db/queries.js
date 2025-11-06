const pool = require("./pool");

const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.id,title,text,timestamp,first_name,last_name,users.id AS user_id FROM messages INNER JOIN users ON messages.user_id=users.id"
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
const addAdmin = async (firstName, lastName, username, password, isAdmin) => {
  await pool.query(
    "INSERT INTO users(first_name,last_name,username,password,is_admin) VALUES($1,$2,$3,$4,$5)",
    [firstName, lastName, username, password, isAdmin]
  );
};
const searchUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username=$1", [
    username,
  ]);
  return rows;
};
const searchUserById = async (userId) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return rows;
};
const addMessage = async (title, text, userId) => {
  await pool.query(
    "INSERT INTO messages (title,text,user_id) VALUES ($1,$2,$3)",
    [title, text, userId]
  );
};
const changeMembershipStatusToAdmin = async (userId) => {
  await pool.query("UPDATE users SET membership_status = 'y' WHERE id=$1", [
    userId,
  ]);
};
module.exports = {
  getAllMessages,
  deleteMessage,
  addUser,
  addAdmin,
  searchUserByUsername,
  searchUserById,
  addMessage,
  changeMembershipStatusToAdmin,
};
