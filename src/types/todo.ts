import { Timestamp } from "firebase/firestore";

export type Todo = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userid: string;
  createAt: Timestamp;
  updatedAt: Timestamp;
};
