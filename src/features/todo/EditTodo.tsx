import { useState } from "react";
import { db } from "../../lib/firebase";
import { doc, Timestamp, updateDoc } from "firebase/firestore";
import { Todo } from "../../types/todo";

type Props = {
  id: string;
  currentTitle: string;
  currentDescription: string;
  onEdit: (id: string, updatedTodo: Todo) => void;
};

const EditTodo = ({ id, currentTitle, currentDescription, onEdit }: Props) => {
  const [title, setTitle] = useState(currentTitle);
  const [description, setDescription] = useState(currentDescription);

  const handleUpdate = async () => {
    const now = Timestamp.fromDate(new Date());

    const updatedTodo: Todo = {
      id,
      title,
      description,
      completed: false,
      userid: "",
      createAt: now,
      updatedAt: now,
    };

    try {
      const todoRef = doc(db, "todos", id);
      await updateDoc(todoRef, {
        title,
        description,
        updatedAt: updatedTodo.updatedAt,
      });

      onEdit(id, updatedTodo);

      alert("✅ 更新完了");
    } catch (error) {
      console.error("更新失敗", error);
      alert("❌ 更新失敗");
    }
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>更新</button>
    </div>
  );
};

export default EditTodo;
