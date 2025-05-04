import { useState } from "react";
import { Todo } from "../../types/todo";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";

type Props = {
  todos: Todo[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, updatedTodo: Todo) => void;
};

const ReadTodo = ({ todos, onDelete, onEdit }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <ul>
      {todos.map((todo) => (
        <li className="mb-2 border-2 border-cyan-400 p-2" key={todo.id}>
          {editingId === todo.id ? (
            <EditTodo
              id={todo.id}
              currentTitle={todo.title}
              currentDescription={todo.description}
              onEdit={(id, updatedTodo) => {
                if (onEdit) {
                  onEdit(id, updatedTodo);
                }
                setEditingId(null);
              }}
            />
          ) : (
            <>
              <p>{todo.title}</p>
              <p>{todo.description}</p>
              <p>{todo.createAt.toDate().toLocaleString()}</p>
              <button onClick={() => setEditingId(todo.id)}>編集</button>
              <DeleteTodo id={todo.id} onDelete={onDelete} />
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ReadTodo;
