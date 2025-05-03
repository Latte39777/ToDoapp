import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Props = {
  id: string;
  onDelete?: (id: string) => void;
};

const DeleteTodo = ({ id, onDelete }: Props) => {
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    const confirmDelete = confirm("本当に削除しますか？");
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
    <button onClick={handleDelete} className="text-red-500">
      削除
    </button>
  );
};

export default DeleteTodo;
