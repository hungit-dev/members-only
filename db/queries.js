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
module.exports = { getAllMessages, deleteMessage };
