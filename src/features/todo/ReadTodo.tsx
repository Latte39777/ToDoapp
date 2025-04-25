import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { Todo } from "../../types/todo";
import { onAuthStateChanged } from "firebase/auth";

const ReadTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "todos"),
          where("userid", "==", user.uid)
        );
        const snapshot = await getDocs(q);
        setTodos(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Todo)
        );
      } else {
        setTodos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ul>
      {todos.map((todo) => (
        <li className="border-2 border-cyan-400" key={todo.id}>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
          <p>{todo.createAt.toDate().toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default ReadTodo;
