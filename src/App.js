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

  return (
    <div className="App">
      <form onSubmit={handleClick}>
        <input
          name="task"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Создать</button>
      </form>
      <div className="wrapper">
        {todoList.map((item) => (
          <div>
            <p>{item.todo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
