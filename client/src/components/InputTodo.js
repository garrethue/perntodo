import React, { Fragment, useState } from "react";

const Inputtodo = () => {
  //description is the internal state and setDescription is our custom named setState() method that will change the state of it
  const [description, setDescription] = useState("");
  //create onSubmitForm
  const onSubmitForm = async (event) => {
    event.preventDefault();

    try {
      const body = { description }; //create an objcet with property description
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }); //by default fetch makes a GET request
      window.location = "/"; //not sure what this will do!
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">My Todo List:</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </Fragment>
  );
};

export default Inputtodo;

//Notes: className="d-flex" in form tag puts the form together
