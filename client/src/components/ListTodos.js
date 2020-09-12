import React, { Fragment, useEffect, useState } from "react";

//component
import EditTodo from "./EditTodo";

const ListTodos = () => {
  //todos will contain an array of objects. Each object represents a row in our todo table!
  //below in the JSX, we map over the todos array and grab the todo.description
  const [todos, setTodos] = useState([]);

  //get function
  const getTodos = async () => {
    try {
      //lets GET the data from the database table todos and package it into a JSON
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      //the JSON data will be set in the state object 'todos'
      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  //delete function
  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id)); //after deleting id from the database table todo,
      //reset the set to reflect this by filtering out the id that was deleted and reset the state variable
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    //useEffect makes a fetch request to a restful api every time the component is rendered
    getTodos();
  }, []); //passing in an empty array as the second argument ensures that we only get the todos once

  return (
    <Fragment>
      <table class="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/*<tr> REFERENCE FOR LATER!!!
                      <td>John</td>
                      <td>Doe</td>
                      <td>john@example.com</td>
                  </tr>*/}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              {/* key={todo.todo_id} allows me to u */}
              {/* this makes each row unique based on the primary key of the database table todo */}
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
