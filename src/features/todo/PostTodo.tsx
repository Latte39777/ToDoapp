import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Todo } from "../../types/todo";
import { auth, db } from "../../lib/firebase";
import { useState } from "react";

const PostTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    try {
      const user = auth.currentUser;
      if (user) {
        await addDoc(collection(db, "todos"), {
          title: title,
          description: description,
          completed: false,
          userid: user.uid,
          createAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        } as Todo);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Post Todo</h2>
      <input
        className="border-2 border-cyan-400"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        className="border-2 border-cyan-400"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button className="border-2 border-cyan-400" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default PostTodo;
