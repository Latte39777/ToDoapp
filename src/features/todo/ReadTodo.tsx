import { useState } from "react";
import { Todo } from "../../types/todo";
import DeleteTodo from "./DeleteTodo";
import EditTodo from "./EditTodo";
import { FiEdit } from "react-icons/fi";

type Props = {
  todos: Todo[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string, updatedTodo: Partial<Todo>) => void;
};

const ReadTodo = ({ todos, onDelete, onEdit }: Props) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {todos.map((todo) => (
          <li
            className="flex flex-col rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-xl"
            key={todo.id}
          >
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
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800">
                    {todo.title}
                  </h3>
                  <p className="mt-2 text-sm whitespace-pre-wrap text-gray-600">
                    {todo.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t pt-4">
                  <p className="text-xs text-gray-400">
                    {todo.createAt.toDate().toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingId(todo.id)}
                      className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800"
                      aria-label="編集"
                    >
                      <FiEdit size={18} />
                    </button>
                    <DeleteTodo
                      id={todo.id}
                      onDelete={onDelete}
                      isIcon={true}
                    />
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReadTodo;
