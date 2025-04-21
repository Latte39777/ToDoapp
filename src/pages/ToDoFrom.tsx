import React, { useState } from "react";
import { Todo } from "../types/todo";
import { Timestamp } from "firebase/firestore";
import { addTodo, auth } from "../lib/firebase";

const TodoForm = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const user = auth.currentUser;

  if (user) {
    const uid = user.uid;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: "",
      title: title,
      description: description,
      completed: false,
      createAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };

    await addTodo(newTodo);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description} // 本文（詳細）の入力フィールド
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
