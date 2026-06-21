import { LogOut, ShieldCheck, UserCircle2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { logoutUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      if (response?.success) {
        setUser(null);
        navigate("/login");
        toast.success("User logged out successfully!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out!");
    }
  };

  return (
    <div className="border-b border-gray-800 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-xl">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Smart Activity Tracker
            </h1>

            <p className="text-gray-400 text-sm">User Analytics Dashboard</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-xl border border-gray-700">
            <UserCircle2 className="w-5 h-5 text-indigo-400" />

            <span className="text-sm text-gray-300">
              Welcome, {user?.name || "User"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
