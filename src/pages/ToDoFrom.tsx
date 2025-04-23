import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Todo } from "../types/todo";
import { db } from "../lib/firebase";

const ToDoForm = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todosData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[];
      console.log(todosData);
      setTodos(todosData);
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <h1>To Do Form</h1>
      <form>
        <input type="text" placeholder="Enter a task" />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.description}</p>
            <p>{todo.createAt.toDate().toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoForm;
