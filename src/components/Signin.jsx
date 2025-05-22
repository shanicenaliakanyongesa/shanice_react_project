import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("email", email);
    data.append("password", password);

    try {
      const response = await axios.post(
        "https://sokotrial.pythonanywhere.com/api/signin ",
        data
      );

      console.log("User Signin Response:", response.data); // Debugging line

      if (response.data.user) {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Notify other components like Navbar
        window.dispatchEvent(new Event("storage"));

        // Redirect after short delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setError(response.data.message || "Invalid credentials.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Signin Error:", err); // Debugging line
      setError(err.response?.data?.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 rounded-3 p-4">
            <h2 className="text-center fw-bold mb-4">Sign In</h2>

            {/* Loading / Error Messages */}
            {loading && (
              <div className="alert alert-info text-center">
                Signing in...
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={submit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="form-control"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="form-control"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-dark w-100 mt-3 py-2"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;