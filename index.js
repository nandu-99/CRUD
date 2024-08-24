const express = require("express");
const dotenv = require("dotenv");
const {pool} = require('./config/db')

dotenv.config(); 
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post("/createTable", async (req, res) => {
  const { tableName, columns } = req.body;
  const columnDefs = columns.map(column => `${column.name} ${column.type}`).join(", ");
  try {
    const result = await pool.query(`CREATE TABLE ${tableName} (
      id SERIAL PRIMARY KEY,
      ${columnDefs}
    )`);
    res.status(201).json({ message: `Table ${tableName} created successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating table" });
  }
});

app.post("/create/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const { name, email, age } = req.body;
  try {
    const result = await pool.query(`INSERT INTO ${tableName} (name, email, age) VALUES ($1, $2, $3) RETURNING id`, [name, email, age]);
    res.status(201).json({ id: result.rows[0].id, name, email });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Get all users from a specified table
app.get("/getUsers/:tableName", async (req, res) => {
  const { tableName } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    res.status(200).json({ result: result.rows });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Delete a user from a specified table
app.delete("/delete/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  try {
    const result = await pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id]);
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
    const result = await pool.query(`UPDATE ${tableName} SET name = $1, email = $2, age = $3 WHERE id = $4`, [name, email, age, id]);
    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user" });
  }
});

pool.getConnection().then((connect) => {
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connect.release();
  });
});

module.exports = app;
