import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("ログアウト失敗", error);
    }
  };

  return (
    <div className="fixed top-6 right-6 z-10">
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-lg border border-white/50 bg-gray-600 px-4 py-2 text-sm text-white/80 transition-colors hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-label="ログアウト"
      >
        <FiLogOut />
        <span>ログアウト</span>
      </button>
    </div>
  );
};

export default LogoutButton;
