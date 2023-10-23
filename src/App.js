import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todoList, setTodoList] = useState(() => {
    let todoList = null;
    try {
      todoList = JSON.parse(localStorage.getItem("todo"));
    } catch (e) {}

    return Array.isArray(todoList) ? todoList : [];
  }); //При перезагрузке возвращает сохранненый список

  //Сохранение списка
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todoList));
  }, [todoList]);

  function handleClick(e) {
    e.preventDefault();

    const newTask = {
      todo: task,
      checked: false,
    };

    setTodoList([...todoList, newTask]);
    setTask("");
  }

  function deleteTodo(e) {
    console.log(e.target.value);
  }

  return (
    <div className="App">
      <div className="createTodo">
        <form onSubmit={handleClick}>
          <input
            name="task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button type="submit">Создать</button>
        </form>
      </div>
      <div className="wrapperTodo">
        {todoList.map((item) => (
          <div className="wrapperTodoTask">
            <div className="todoTask">
              <p>{item.todo}</p>
              <button className="deleteBtn" value={item} onClick={deleteTodo}>
                <svg width="24" height="24">
                  <path
                    d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5-1-1h-5l-1 1H5v2h14V4z"
                    stroke="black"
                    stroke-width="0.1"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
