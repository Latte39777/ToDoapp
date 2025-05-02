import { addDoc, collection, Timestamp } from "firebase/firestore";
import { Todo, onAdd } from "../../types/todo";
import { auth, db } from "../../lib/firebase";
import { useState } from "react";

const PostTodo = ({ onAdd }: onAdd) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    alert("submit開始");

    const user = auth.currentUser;
    alert("user取得");

    if (!user) {
      alert("❌ ユーザー取得失敗");
      return;
    }

    try {
      const now = Timestamp.fromDate(new Date());

      const docRef = await addDoc(collection(db, "todos"), {
        title,
        description,
        completed: false,
        userid: user.uid,
        createAt: now,
        updatedAt: now,
      });

      const newTodo: Todo = {
        id: docRef.id,
        title,
        description,
        completed: false,
        userid: user.uid,
        createAt: now,
        updatedAt: now,
      };
      alert("🎉 add todo");

      onAdd(newTodo);
      setTitle("");
      setDescription("");
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
      <button
        className="border-2 border-cyan-400"
        type="submit"
        onClick={() => alert("🧪 ボタン押された")}
      >
        Add Todo
      </button>
    </form>
  );
};

export default PostTodo;
