import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { FiTrash2 } from "react-icons/fi";
import { db } from "../../lib/firebase";

type Props = {
  id: string;
  onDelete?: (id: string) => void;
  isIcon?: boolean;
};

const DeleteTodo = ({ id, onDelete }: Props) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    const confirmDelete = window.confirm("本当に削除しますか？");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "todos", id));
      if (onDelete) onDelete(id);
    } catch (error) {
      console.error("Error deleting todo:", error);
      alert("Error deleting todo");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-full p-2 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-600"
      aria-label="削除"
    >
      <FiTrash2 size={18} />
    </button>
  );
};

export default DeleteTodo;
