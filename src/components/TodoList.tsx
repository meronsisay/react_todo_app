import { useState } from "react";
import type { TodoType } from "../todo";
import TodoService from "../todoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>(TodoService.getTodos());
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>("");

  const handleEdit = (id: number, text: string) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditText("");
  };

  const handleEditSave = (id: number) => {
    if (editText.trim() !== "") {
      const updateTodo = TodoService.updateTodo({
        id,
        title: editText,
        completed: false,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updateTodo : todo))
      );
      setEditId(null);
      setEditText("");
    }
  };

  const handleDelete = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <div>
        {/* input field */}
        <TodoForm setTodos={setTodos} />
      </div>
      <div className="card p-3 shadow-sm w-50 mx-auto">
        <h2>Tasks</h2>
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="d-flex align-items-center justify-content-between mb-2 border-bottom pb-2"
          >
            {editId == todo.id ? (
              <div className="d-flex w-100 gap-2">
                <input
                  className="form-control"
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus={true}
                />
                <button
                  className="btn btn-success"
                  onClick={() => handleEditSave(todo.id)}
                >
                  <FaCheck />
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleEditCancel()}
                >
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-between w-100 gap-1">
                <span>{todo.title}</span>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleEdit(todo.id, todo.title)}
                >
                  <FaEdit />
                </button>
              </div>
            )}
            <button
              className="btn btn-outline-danger mx-1"
              onClick={() => handleDelete(todo.id)}
            >
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
