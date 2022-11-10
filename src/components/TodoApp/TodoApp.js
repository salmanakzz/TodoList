import React, { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [editText, setEditText] = useState({
    id: null,
    text: "",
  });
  const [text, setText] = useState(editText ? editText.text : "");

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekday[new Date().getDay()];

  const addTodo = (event) => {
    event.preventDefault();
    if (!text || /^\s*$/.test(text)) {
      return;
    }
    setTodos([...todos, { id: Date.now(), text, status: false }]);
    setText("");
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const submitUpdate = (value) => {
    updateTodo(editText.id, value);
    setEditText({
      id: null,
      text: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitUpdate({
      id: Math.floor(Math.random() * 10000),
      text: text,
    });
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    editText.text = e.target.value;
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {day} 🌝 ☕ </h2>
      </div>

      {editText.id ? (
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            placeholder="Update your item"
            value={editText.text}
            onChange={handleChange}
            name="text"
            className="todo-input-edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </form>
      ) : (
        <div className="input">
          <form onSubmit={addTodo}>
            <input
              value={editText.id ? "" : text}
              onChange={(event) => setText(event.target.value)}
              type="text"
              placeholder="🖊️ Add item..."
            />
          </form>
          <i onClick={addTodo} className="fas fa-plus"></i>
        </div>
      )}

      {todos.map((data) => (
        <div className="todos" key={data.id}>
          <div className="todo">
            <div className="left">
              <input
                onChange={(event) =>
                  setTodos(
                    todos.filter((data3) => {
                      if (data3.id === data.id) {
                        data3.status = event.target.checked;
                      }
                      return data3;
                    })
                  )
                }
                type="checkbox"
                name=""
                id=""
              />
              <p>{data.text}</p>
            </div>
            <div className="right">
              <i
                onClick={() => setEditText({ id: data.id, text: data.text })}
                className="fa-regular fa-pen-to-square"
                style={{ marginRight: "7px" }}
              ></i>
              <i
                onClick={() =>
                  setTodos(todos.filter((data2) => data2.id !== data.id))
                }
                className="fas fa-times"
              ></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoApp;
