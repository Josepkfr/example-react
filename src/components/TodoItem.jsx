import React from "react";

function TodoItem({ todo, toggleTodo }) {
  const { id, task, description, complete } = todo;
  const handleTodoClick = () => {
    toggleTodo(id);
  };
  return (
    <li>
      <input type="checkbox" onChange={handleTodoClick} checked={complete} />
      {task}
    </li>
  );
}

export default TodoItem;
