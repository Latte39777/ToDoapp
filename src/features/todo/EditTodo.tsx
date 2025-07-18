import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { Todo } from "../../types/todo";

type Props = {
  id: string;
  currentTitle: string;
  currentDescription: string;
  onEdit: (id: string, updatedTodo: Partial<Todo>) => void;
  onCancel: () => void;
};

const EditTodo = ({
  id,
  currentTitle,
  currentDescription,
  onEdit,
  onCancel,
}: Props) => {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);

  const handleUpdate = async () => {
    const now = Timestamp.fromDate(new Date());

    const updatedData = {
      title,
      description,
      updatedAt: now,
    };

    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, updatedData);

      onEdit(id, { id, ...updatedData });

      alert("✅ 更新完了");
    } catch (error) {
      console.error("更新失敗", error);
      alert("❌ 更新失敗");
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-grow">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-lg font-bold text-gray-800 focus:outline-none"
          placeholder="タイトル"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 h-full w-full resize-none bg-transparent text-sm text-gray-600 focus:outline-none"
          placeholder="詳細"
        />
      </div>
      <div className="mt-10 flex items-center justify-end gap-2">
        <button
          onClick={onCancel}
          className="rounded-md px-3 py-1 text-sm text-gray-600 transition-colors hover:bg-gray-100"
        >
          キャンセル
        </button>
        <button
          onClick={handleUpdate}
          className="rounded-md bg-blue-500 px-3 py-1 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
        >
          更新
        </button>
      </div>
    </div>
  );
};

export default EditTodo;
