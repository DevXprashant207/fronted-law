import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loginType, setLoginType] = useState("subadmin"); // 👈 Default: Sub Admin
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        loginType === "admin"
          ? "https://law-firm-backend-e082.onrender.com/api/admin/auth/login"
          : "https://law-firm-backend-e082.onrender.com/api/subadmin/auth/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Incorrect email/password");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "admin",
        JSON.stringify({ name: data.name, role: data.role })
      );

      setTimeout(() => {
        navigate("/admin");
      }, 200);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8f6f2] to-[#e5e2dc] font-serif relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-10 pointer-events-none"></div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md border border-[#e5e2dc]"
      >
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 gap-3">
          <button
            type="button"
            onClick={() => setLoginType("subadmin")}
            className={`px-5 py-2 rounded-md font-semibold transition-all ${
              loginType === "subadmin"
                ? "bg-[#cfac33] text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300 text-[#4c3a1a]"
            }`}
          >
            Sub Admin
          </button>
          <button
            type="button"
            onClick={() => setLoginType("admin")}
            className={`px-5 py-2 rounded-md font-semibold transition-all ${
              loginType === "admin"
                ? "bg-[#cfac33] text-white shadow-md"
                : "bg-gray-200 hover:bg-gray-300 text-[#4c3a1a]"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col items-center mb-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Admin Login"
            className="h-14 mb-2 rounded-full shadow-lg border border-[#e5e2dc] bg-white"
          />
          <h2 className="text-3xl font-bold text-[#cfac33] mb-1">
            {loginType === "admin" ? "Admin Login" : "Sub Admin Login"}
          </h2>
          <span className="text-[#f5c56d] text-sm font-medium">
            Gupta Law Offices
          </span>
          <span className="text-xs text-[#7c6a4c] mt-1 italic">
            Secure access for authorized personnel only
          </span>
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="block text-[#4c3a1a] mb-2 font-semibold">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-[#e5e2dc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa77a] bg-[#f8f6f2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            autoComplete="username"
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="block text-[#4c3a1a] mb-2 font-semibold">
            Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-[#e5e2dc] rounded focus:outline-none focus:ring-2 focus:ring-[#bfa77a] bg-[#f8f6f2]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            autoComplete="current-password"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-3 mb-2 text-red-600 text-sm text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#cfac33] text-white py-2 rounded font-semibold shadow hover:bg-[#b8932b] transition-all disabled:opacity-50 text-lg mt-4"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Logging in...
            </span>
          ) : (
            `Login as ${loginType === "admin" ? "Admin" : "Sub Admin"}`
          )}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
