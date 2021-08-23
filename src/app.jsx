import React, { useState, useRef, useEffect } from "react";
import { Todolist } from "./components/Todolist";
import { v4 as uuid } from "uuid";

export function App() {
  const [todos, setTodos] = useState([
    { id: "1", task: "1", description: "Hola Mundo", complete: false },
    { id: "2", task: "1", description: "Hola Mundo", complete: false },
  ]);

  const todoTaskRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todo"));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  };

  const handleTodoAdd = () => {
    const task = todoTaskRef.current.value;
    if (task === "") return;
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: uuid(), task, description: "", complete: false },
      ];
    });
    todoTaskRef.current.value = null;
  };

  const handleClearAll = () => {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  };

  return (
    <>
      <Todolist todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
      <button onClick={handleTodoAdd}>+</button>
      <button onClick={handleClearAll}>-</button>
      <div>
        Te quedan {todos.filter((todo) => !todo.complete).length} Tareas
      </div>
    </>
  );
}
