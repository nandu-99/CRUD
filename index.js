const express = require("express");
const dotenv = require("dotenv");
const { pool } = require('./config/db');

dotenv.config(); 
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Create a new table with specified columns
app.post("/createTable", async (req, res) => {
  const { tableName, columns } = req.body;
  const columnDefs = columns.map(column => `${column.name} ${column.type}`).join(", ");
  try {
    await pool.query(`CREATE TABLE ${tableName} (
      id SERIAL PRIMARY KEY,
      ${columnDefs}
    )`);
    res.status(201).json({ message: `Table ${tableName} created successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating table" });
  }
});

// Insert a new user into the specified table
app.post("/create/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const { name, email, age } = req.body;
  try {
    await pool.query(`INSERT INTO ${tableName} (name, email, age) VALUES (?, ?, ?)`, [name, email, age]);
    res.status(201).json({ name, email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Get all users from a specified table
app.get("/get/:tableName", async (req, res) => {
  const { tableName } = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM ${tableName}`);
    res.status(200).json({result});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete a user from a specified table
app.delete("/delete/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  try {
    await pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

// Update a user in a specified table
app.put("/update/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  const { name, email, age } = req.body;
  try {
    await pool.query(`UPDATE ${tableName} SET name = ?, email = ?, age = ? WHERE id = ?`, [name, email, age, id]);
    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user" });
  }
});

// Truncate a specified table
app.post("/truncateTable", async (req, res) => {
  const { tableName } = req.body;
  try {
    await pool.query(`TRUNCATE TABLE ${tableName}`);
    res.status(200).json({ message: `Table ${tableName} truncated successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error truncating table" });
  }
});

// Delete a specified table
app.delete("/deleteTable/:tableName", async (req, res) => {
  const { tableName } = req.params;
  try {
    await pool.query(`DROP TABLE IF EXISTS ${tableName}`);
    res.status(200).json({ message: `Table ${tableName} deleted successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting table" });
  }
});

app.get("/getColumns/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const query = `
    SELECT COLUMN_NAME 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = ?`;

  try {
    const [rows] = await pool.query(query, [tableName]);
    const columnNames = rows.map(row => row.COLUMN_NAME);
    res.status(200).json(columnNames);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching table columns" });
  }
});


// Start the server after establishing a connection to the database
pool.getConnection().then((connect) => {
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connect.release();
  });
});

module.exports = app;
