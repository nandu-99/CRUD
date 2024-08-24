const express = require("express");
const dotenv = require("dotenv");
const {pool} = require('./config/db')

dotenv.config(); 
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.post("/createTable", async (req, res) => {
  const { tableName } = req.body;
  try {
    const result = await pool.query(`CREATE TABLE ${tableName} (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      age INTEGER
    )`);
    res.status(201).json({ message: `Table ${tableName} created successfully` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating table" });
  }
});


app.post("/create", async (req, res)=>{
  const {name, email, age} = req.body;
  try{
    const result = await pool.query("INSERT INTO users (name, email, age) VALUES (?,?,?)",[name, email, age]);
    res.status(201).json({ name, email });
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Error creating user" });
  }
})

app.get("/getUsers", async(req, res)=>{
  try{
    const [result] = await pool.query("SELECT * FROM users");
    res.status(200).json({result});
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Error fetching users" });
  }
})

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const del = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error deleting user" });
  }
});

app.put("/update/:id", async (req, res)=>{
  const id = req.params.id;
  const {name, email, age} = req.body;
  try{
    const result = await pool.query("UPDATE users SET name = ?, email = ?, age = ?", [name, email, age])
    res.status(200).json({ message: "Updated Successfully" });
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Error updating user" });
  }
})

pool.getConnection().then((connect)=>{
  console.log("Connected to database");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connect.release();
  });
})
  
module.exports = app;













