import PostTodo from "../features/todo/PostTodo";
import ReadTodo from "../features/todo/ReadTodo";

const TodoFrom = () => {
  return (
    <>
      <h1>Todo Form test</h1>
      <PostTodo onAdd={handleAddTodo} />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </li>
        ))}
      </ul>
      <ReadTodo></ReadTodo>
    </>
  );
};

export default TodoFrom;
