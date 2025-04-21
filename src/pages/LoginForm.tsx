import Login from "../features/auth/Login";

const LoginForm = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-200">
      <h1 className="py-auto text-6xl">ToDo App</h1>
      <br />
      <Login />
    </div>
  );
};

export default LoginForm;
