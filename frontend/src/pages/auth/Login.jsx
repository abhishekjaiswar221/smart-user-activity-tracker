import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import { loginUser } from "../../api/authApi";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const response = await loginUser(Object.fromEntries(formData));
      localStorage.setItem("token", response.data?.token);

      if (response?.success) {
        navigate("/dashboard");
      }

      toast.success("User logged in successfully!");
    } catch (error) {
      console.error("Error logging in", error);
      toast.error("Error logging in user!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-full mb-4">
            <ShieldCheck className="text-white w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>

          <p className="text-gray-400 mt-2 text-sm">
            Login to your analytics dashboard
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition duration-200"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-400 hover:text-indigo-300 cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
