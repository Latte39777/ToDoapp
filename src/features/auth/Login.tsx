import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      console.log("ログイン成功:", uid);
      navigate(`/user/${uid}/todo`);
    } catch (error) {
      console.error("ログイン失敗:", error);
    }
  };

  return (
    <button onClick={handleLogin} className="bg-green-300">
      Login
    </button>
  );
};

export default Login;
