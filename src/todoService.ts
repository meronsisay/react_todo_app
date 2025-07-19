import type { TodoType } from "./todo";

const LOCAL_STORAGE_KEY = "todos";

 const TodoService = {

    // get todo
     getTodos:(): TodoType[] =>{
       const todo =  localStorage.getItem(LOCAL_STORAGE_KEY)
       return todo? JSON.parse(todo) : [];
     },
     // add todo
     addTodos: (title: string): TodoType =>{
        const todos = TodoService.getTodos();
        const newTodo:TodoType ={
            id: todos.length + 1, title, completed: false
        }
        const updateTodos = [...todos, newTodo]
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos))
        return newTodo
     },

     //update The todo
     updateTodo: (todo: TodoType): TodoType => {
        const todos = TodoService.getTodos();
        const updateTodos = todos.map((t) => (t.id === todo.id)? todo : t);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return todo
     },
     // deleting todo
     deleteTodo:(id: number): void =>{
        const todos = TodoService.getTodos();
        const deleteTodo = todos.filter((todo) => todo.id !== id)
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(deleteTodo)); 
     }
 }

 export default TodoService