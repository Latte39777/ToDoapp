import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import ToDoFrom from "./pages/ToDoFrom"; // 作る！

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user/:uid/todo" element={<ToDoFrom />} />
      </Routes>
    </Router>
  );
}

export default App;
