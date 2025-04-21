import { useParams } from "react-router-dom";

const TodoPage = () => {
  const { uid } = useParams();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">ようこそ、ユーザー {uid} さん</h1>
    </div>
  );
};

export default TodoPage;
