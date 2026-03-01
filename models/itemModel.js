const db = require("../db");

exports.getAllItems = async () => {
  const [rows] = await db.query("SELECT * FROM items ORDER BY date DESC");
  return rows;
};

exports.getItemById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM items WHERE id = ?", [id]);
  return rows[0];
};

exports.createItem = async (data) => {
  const { title, description, category, location, date, contact } = data;
  const [result] = await db.execute(
    "INSERT INTO items (title, description, category, location, date, contact) VALUES (?, ?, ?, ?, ?, ?)",
    [title, description, category, location, date, contact]
  );
  return result;
};

exports.updateStatus = async (id) => {
  await db.query(
    "UPDATE items SET status = 'Claimed' WHERE id = ?",
    [id]
  );
};

exports.deleteItem = async (id) => {
  await db.query("DELETE FROM items WHERE id = ?", [id]);
};