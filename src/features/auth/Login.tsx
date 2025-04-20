import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("ログイン成功:", user);
        navigate("/todo");
      })
      .catch((error) => {
        console.error("ログイン失敗:", error);
      });
  };

  return (
    <button
      className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      type="button"
      onClick={handleLogin}
    >
      Googleでログイン
    </button>
  );
};

export default Login;
