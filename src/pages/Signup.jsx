import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { auth, googleProvider } from "../firebase";
// import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email sign-up
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Optional: save name in Firebase profile
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  // Google sign-up
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
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

          <h2 className="text-2xl font-bold text-center mb-4">Join Us</h2>
          <p className="text-center text-gray-500 mb-6">
            Sign up to access your dashboard
          </p>

          <button
            onClick={handleGoogleSignup}
            className="w-full bg-red-500 text-white py-2 rounded-lg mb-4 hover:bg-red-600 transition"
          >
            Sign up with Google
          </button>

          <p className="text-center text-gray-400 mb-4">Or continue with email</p>

          <form onSubmit={handleEmailSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
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
              className="w-full bg-brand-gold text-white py-2 rounded-lg hover:bg-yellow-500 transition"
            >
              Sign Up
            </button>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          <p className="text-center text-gray-500 mt-6">
            Already have an account? <a href="./Login" className="text-brand-gold">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
