import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import LoginForm from "./pages/LoginForm";
import TodoForm from "./pages/TodoFrom";

function App() {
  const [user, loading, error] = useAuthState(auth);

  console.log("user", user);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/user/:uid/todo"
          element={user ? <TodoForm /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
