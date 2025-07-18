import AnimatedCircles from "../components/AnimationCircles";
import Login from "../features/auth/Login";

const LoginForm = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-blue-400">
      <div className="relative z-10 flex h-screen flex-col items-center justify-center">
        <h1 className="py-auto font-serif text-6xl">Welcome ToDo App</h1>
        <Login />
      </div>
      <div className="absolute inset-0 z-0">
        <AnimatedCircles count={30} />
      </div>
    </div>
  );
};

export default LoginForm;
