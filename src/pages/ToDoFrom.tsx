import { useEffect, useState } from "react";
import fetchTodos from "../features/todo/read";
import { Todo } from "../types/todo";
import { useParams } from "react-router-dom";

const ToDoForm = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { uid } = useParams<{ uid: string }>();

  useEffect(() => {
    const getTodos = async () => {
      if (!uid) {
        console.error("User ID is not defined");
        return;
      }
      const data = await fetchTodos(uid);
      console.log("Fetched todos:", data); // ←ここでログ確認！
      setTodos(data);
    };

    getTodos();
  }, [uid]);

  return (
    <div>
      <h1>To Do Form</h1>
      <form>
        <input type="text" placeholder="Enter a task" />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoForm;
