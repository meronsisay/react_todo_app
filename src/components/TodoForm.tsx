import { useState, type Dispatch, type SetStateAction } from "react"
import TodoService from "../todoService";
import type { TodoType } from "../todo";

interface Props{
    setTodos : Dispatch<SetStateAction<TodoType[]>>
}

const TodoForm: React.FC<Props> = ({setTodos}) => {
    const [newText, setNewText] = useState<string>("");
    const handleAddTodo = () => {
        if(newText.trim() !== ""){
            const newTodo = TodoService.addTodos(newText)
            setTodos((prev) => [...prev, newTodo])
            setNewText("")
        }
    }
  return (
    <div className="mb-3 d-flex flex-column gap-2 w-sm-100 w-50 mx-auto">
      <input
        className="p-1"
        type="text"
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        autoFocus={true}
        placeholder="Add Task..."
      />
      <button className="btn btn-secondary" onClick={handleAddTodo}>
        Add Todo
      </button>
    </div>
  );
}

export default TodoForm
