const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { pool } = require('./config/db');

dotenv.config();
const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const port = process.env.PORT || 3000;

// Create a new table with specified columns
app.post("/createTable", async (req, res) => {
  const { tableName, columns } = req.body;
  const columnDefs = columns.map(column => `${column.name} ${column.type}`).join(", ");
  try {
    await pool.query(`CREATE TABLE ?? (
      id SERIAL PRIMARY KEY,
      ${columnDefs}
    )`, [tableName]);
    res.status(201).json({ message: `Table ${tableName} created successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating table", error: err.message });
  }
});

// Insert a new user into the specified table
app.post("/create/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const fields = Object.keys(req.body);
  const values = Object.values(req.body);
  
  const placeholders = fields.map(() => '?').join(', ');
  const fieldNames = fields.map(() => '??').join(', ');

  try {
    const query = `INSERT INTO ?? (${fieldNames}) VALUES (${placeholders})`;
    await pool.query(query, [tableName, ...fields, ...values]);
    res.status(201).json(req.body);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating record", error: err.message });
  }
});


// Get all users from a specified table
app.get("/get/:tableName", async (req, res) => {
  const { tableName } = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM ??`, [tableName]);
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
});

// Delete a user from a specified table
app.delete("/delete/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  try {
    await pool.query(`DELETE FROM ?? WHERE id = ?`, [tableName, id]);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
});

// Update a user in a specified table
app.put("/update/:tableName/:id", async (req, res) => {
  const { tableName, id } = req.params;
  const updates = req.body;
  const setClause = Object.keys(updates).map(() => `?? = ?`).join(', ');
  const params = [...Object.keys(updates).flatMap(key => [key, updates[key]]), id];

  try {
    const query = `UPDATE ?? SET ${setClause} WHERE id = ?`;
    await pool.query(query, [tableName, ...params]);
    res.status(200).json({ message: "Updated Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
});

// Truncate a specified table
app.post("/truncateTable", async (req, res) => {
  const { tableName } = req.body;
  try {
    await pool.query(`TRUNCATE TABLE ??`, [tableName]);
    res.status(200).json({ message: `Table ${tableName} truncated successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error truncating table", error: err.message });
  }
});

// Delete a specified table
app.delete("/deleteTable/:tableName", async (req, res) => {
  const { tableName } = req.params;
  try {
    await pool.query(`DROP TABLE IF EXISTS ??`, [tableName]);
    res.status(200).json({ message: `Table ${tableName} deleted successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting table", error: err.message });
  }
});

// Get all columns from a specified table
app.get("/getColumns/:tableName", async (req, res) => {
  const { tableName } = req.params;
  const query = `
    SELECT COLUMN_NAME, COLUMN_TYPE 
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = ?`;

  try {
    const [rows] = await pool.query(query, [tableName]);
    const columns = rows.map(row => ({
      name: row.COLUMN_NAME,
      type: row.COLUMN_TYPE
    }));
    res.status(200).json(columns);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching table columns", error: err.message });
  }
});

// Get all tables in the database
app.get("/tables", async (req, res) => {
  const query = `
    SELECT TABLE_NAME 
    FROM INFORMATION_SCHEMA.TABLES 
    WHERE TABLE_SCHEMA = DATABASE()`;

  try {
    const [rows] = await pool.query(query);
    const tableNames = rows.map(row => row.TABLE_NAME);
    res.status(200).json(tableNames);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching tables", error: err.message });
  }
});

// Alter a table by performing a specified operation (e.g., ADD, DROP, MODIFY)
app.post("/alterTable", async (req, res) => {
  const { tableName, operation, columnName, columnType } = req.body;
  if (!tableName || !operation || !['ADD', 'DROP', 'MODIFY'].includes(operation)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    let query;
    switch (operation) {
      case 'ADD':
        if (!columnType) {
          return res.status(400).json({ message: 'Column type is required for ADD operation' });
        }
        query = `ALTER TABLE ?? ADD COLUMN ?? ${columnType}`;
        break;
      case 'DROP':
        query = `ALTER TABLE ?? DROP COLUMN ??`;
        break;
      case 'MODIFY':
        if (!columnType) {
          return res.status(400).json({ message: 'Column type is required for MODIFY operation' });
        }
        query = `ALTER TABLE ?? MODIFY COLUMN ?? ${columnType}`;
        break;
      default:
        throw new Error('Invalid operation');
    }
    await pool.query(query, [tableName, columnName]);
    res.status(200).json({ message: `Table ${tableName} altered successfully with operation: ${operation}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error altering table", error: err.message });
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
