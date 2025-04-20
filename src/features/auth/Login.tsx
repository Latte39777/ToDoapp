import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../lib/firebase";

const Login = () => {
  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("ログイン成功:", user);
      })
      .catch((error) => {
        console.error("ログイン失敗:", error);
      });
  };

  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded"
      onClick={handleLogin}
    >
      Googleでログイン
    </button>
  );
};

export default Login;
