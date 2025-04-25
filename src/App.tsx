import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import TodoFrom from "./pages/TodoFrom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user/:uid/todo" element={<TodoFrom />} />
      </Routes>
    </Router>
  );
}

export default App;
