const pool = require("./pool");

const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM messages INNER JOIN users ON messages.user_id=users.id"
  );
  return rows;
};
module.exports = { getAllMessages };
