const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); //by using a pool we can write queries using postgresql

//middleware
app.use(cors()); //anytime you are going to create MIDDLEWARE you need to use app.use();
//anytime you need to get data from client side, you need to get it from the request.body object
app.use(express.json()); //by using this, essentially gives us access to request.body and will return json data

//ROUTES//

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body; //destructure to grab the value of description from req.body object
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *", //RETURNING * is used whenever you are updating, inserting, deleting data
      [description]
    );

    res.json(newTodo);
  } catch (err) {
    console.error(err.message); //whats console error do?
  }
});

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [
      id,
    ]);
  } catch (err) {
    console.log(err.message);
  }
  res.json("todo was deleted");
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
