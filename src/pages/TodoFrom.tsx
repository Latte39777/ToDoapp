import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
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
        // console.log("q", q); // q はあくまでもどう取得するか
        const snapshot = await getDocs(q);
        console.log("snapshot", snapshot);
        const todoList = snapshot.docs.map(
          (doc) => ({ ...doc.data(), id: doc.id }) as Todo
        );
        console.log("todoList", todoList);
        setTodos(todoList);
      } else {
        setTodos([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleAddTodo = (newTodo: Todo) => {
    console.log("add task");
    alert("add task");
    setTodos((prev) => [newTodo, ...prev]);
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
