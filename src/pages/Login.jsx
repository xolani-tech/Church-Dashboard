import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error. Try again later.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg overflow-hidden flex">
        
        {/* Left image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/src/assets/The Man of God 3.jpg"
            alt="Church"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/src/assets/logo.png"
              alt="Church Logo"
              className="h-20 w-20 object-contain"
            />
          </div>

          <h2 className="text-2xl font-bold text-center mb-4">Welcome Back</h2>
          <p className="text-center text-gray-500 mb-6">
            Login to access your dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email or username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="submit"
              className="w-full bg-brand-gold text-white py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Login
            </button>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          <p className="text-center text-gray-500 mt-6">
            Don't have an account? <a href="/signup" className=" text-brand-gold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}
