import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../lib/firebase";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const uid = result.user.uid;
      console.log("ログイン成功 ログイン中のユーザーUID:", uid);
      navigate(`/`);
    } catch (error) {
      console.error("ログイン失敗:", error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="my-2 flex w-full max-w-xs items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 font-semibold text-gray-700 shadow-sm transition-all duration-150 hover:bg-gray-50 active:scale-95"
    >
      <FcGoogle size={24} />
      <span>Googleでログイン</span>
    </button>
  );
};

export default Login;
