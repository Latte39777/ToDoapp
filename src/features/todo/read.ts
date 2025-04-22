import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Todo } from "../../types/todo";

const fetchTodos = async (uid: string): Promise<Todo[]> => {
  const q = query(collection(db, "todos"), where("userid", "==", uid));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Todo[];
};

export default fetchTodos;
