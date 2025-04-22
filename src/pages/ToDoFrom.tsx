import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const user = auth.currentUser || null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("ログインしてください");
      return;
    }

    try {
      await addDoc(collection(db, "todos"), {
        userid: user.uid,
        title,
        description,
        completed: false,
        createAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // フォームをリセット
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("ToDoの追加に失敗しました:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="タイトル"
        className="w-full rounded-md border-2 border-black p-2"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="説明"
        className="w-full rounded-md border-2 border-black p-2"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
      >
        追加
      </button>
    </form>
  );
};

export default TodoForm;
