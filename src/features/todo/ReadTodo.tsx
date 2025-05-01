import { Todo } from "../../types/todo";

type Props = {
  todos: Todo[];
};

const ReadTodo = ({ todos }: Props) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li className="border-2 border-cyan-400" key={todo.id}>
          <p>{todo.title}</p>
          <p>{todo.description}</p>
          <p>{todo.createAt.toDate().toLocaleString()}</p>
        </li>
      ))}
    </ul>
  );
};

export default ReadTodo;
