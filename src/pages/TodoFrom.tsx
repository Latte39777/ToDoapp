import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import PostTodo from "../features/todo/PostTodo";
import ReadTodo from "../features/todo/ReadTodo";
import { Todo } from "../types/todo";
import { auth, db } from "../lib/firebase";

const TodoFrom = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "todos"),
          where("userid", "==", user.uid),
          orderBy("createAt", "desc")
        );
        const snapshot = await getDocs(q);
        const todoList = snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id }) as Todo
        );
        setTodos(todoList);
      } else {
        setTodos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos((prev) =>
      [newTodo, ...prev].sort(
        (a, b) => b.createAt.toMillis() - a.createAt.toMillis()
      )
    );
  };

  return (
    <>
      <h1>Todo Form test</h1>
      <PostTodo onAdd={handleAddTodo} />
      <ReadTodo todos={todos} />
    </>
  );
};

export default TodoFrom;
