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

    try {
      const user = auth.currentUser;
      if (user) {
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

        console.log("add todo");
        alert("add todo");

        onAdd(newTodo);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <>
      <div className="w-full p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <input
              id="title"
              className="w-full rounded-md bg-gray-200 p-3 shadow-sm backdrop-blur-sm transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              type="text"
              placeholder="Todoのタイトル"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <textarea
              id="description"
              className="h-24 w-full rounded-md bg-gray-200 p-3 text-base shadow-sm backdrop-blur-sm transition-colors focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="詳細な内容"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full rounded-md bg-sky-500 px-4 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-sky-600 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
            type="submit"
          >
            追加
          </button>
        </form>
      </div>
    </>
  );
};

export default PostTodo;
