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
    setTodos((prev) => [newTodo, ...prev]);
    alert("add task");
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id: string, updatedTodo: Todo) => {
    console.log("update task 1");
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo))
    );
    console.log(todos.filter((todo) => todo.id === id));
    console.log("update task");
  };

  return (
    <>
      <h1>Todo Form test</h1>
      <PostTodo onAdd={handleAddTodo} />
      <ReadTodo
        todos={todos}
        onDelete={handleDeleteTodo}
        onEdit={handleEditTodo}
      ></ReadTodo>
    </>
  );
};

export default TodoFrom;
