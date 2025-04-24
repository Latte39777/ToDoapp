import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { Todo } from "../types/todo";
import { onAuthStateChanged } from "firebase/auth";

const ToDoForm = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "todos"),
          where("userid", "==", user.uid)
        );

        console.log("bbb", user.uid);

        const snapshot = await getDocs(q);

        console.log("ccc", snapshot.docs);

        snapshot.docs.forEach((doc) => {
          console.log("1:doc.data():", doc.data());
        });

        setTodos(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Todo)
        );

        snapshot.docs.forEach((doc) => {
          console.log("2:doc.data():", doc.data());
        });
      } else {
        setTodos([]);
      }
    });

    return () => unsubscribe();
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
