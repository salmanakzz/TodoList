import React, { Component } from "react";
import "./TodoApp.css";

class TodoApp extends Component {
  state = {
    input: "",
    items: [],
  };

  handleChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  storeItems = (event) => {
    event.preventDefault();
    const { input } = this.state;

    this.setState({
      items: [...this.state.items, input],
      input: "",
    });
  };

  deleteItem = (key) => {
    // const allItems = [...this.state.items];
    // allItems.splice(index, 1); // Here splice takes 2 parameters (index of item, no:items want to pull by the index)

    // this.setState({
    //   items: allItems,
    // });

    // OR

    this.setState({
      items: this.state.items.filter((data, index) => index !== key), // Advanced way for deleteting values
    });
  };

  render() {
    const { input, items } = this.state;
    console.log(items);

    return (
      <div className="todo-container">
        <form className="input-section" onSubmit={this.storeItems}>
          <h1>TodoApp</h1>
          <input
            type="text"
            onChange={this.handleChange}
            value={input}
            placeholder="Enter items.."
          />
        </form>

        <ul>
          {items.map((data, index) => (
            <li key={index}>
              {data}
              <div>
                <i
                  className="fa-solid fa-trash-can"
                  onClick={() => this.deleteItem(index)}
                ></i>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
