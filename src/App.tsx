import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import ToDoFrom from "./pages/ToDoFrom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/todo" element={<ToDoFrom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
