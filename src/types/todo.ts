import { Timestamp } from "firebase/firestore";

type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userid: string;
  createAt: Timestamp;
  updatedAt: Timestamp;
};

type onAdd = {
  onAdd: (todo: Todo) => void;
};

type onDelete = {
  onDelete?: (id: string) => void;
};

export type { Todo, onAdd, onDelete };
