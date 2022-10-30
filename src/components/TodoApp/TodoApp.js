import React, { useState } from "react";
import "./TodoApp.css";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
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
  console.log(todos);

  const addTodo = (event) => {
    event.preventDefault();
    if (!text || /^\s*$/.test(text)) {
      return;
    }
    setTodos([...todos, { id: Date.now(), text, status: false }]);
    setText("");
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
      <div className="input">
        <form onSubmit={addTodo}>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            type="text"
            placeholder="🖊️ Add item..."
          />
        </form>
        <i onClick={addTodo} className="fas fa-plus"></i>
      </div>
      {todos.map((data) => (
        <div className="todos">
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
            <i className="fa-regular fa-pen-to-square" style={{marginRight:'7px'}}></i>
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
