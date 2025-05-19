import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const data = new FormData();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);
    data.append("phone", phone);

    try {
      const response = await axios.post(
        "https://sokotrial.pythonanywhere.com/api/signup",
        data
      );

      setSuccess(response.data.message);
      setLoading(false);

      // Reset fields
      setUsername("");
      setEmail("");
      setPassword("");
      setPhone("");

      // Redirect after delay
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 rounded-3 p-4">
            <h2 className="text-center fw-bold mb-3">Create Account</h2>
            <p className="text-center text-muted mb-4">
              Join Gym Extreme Essentials today!
            </p>

            {/* Loading / Success / Error Messages */}
            {loading && (
              <div className="alert alert-info text-center">
                Please wait as we create your account...
              </div>
            )}
            {success && (
              <div className="alert alert-success text-center">{success}</div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={submit}>
              {/* Username */}
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingUsername"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="floatingUsername">Username</label>
              </div>

              {/* Email */}
              <div className="mb-3 form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingEmail"
                  placeholder="Email address"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingEmail">Email address</label>
              </div>

              {/* Password */}
              <div className="mb-3 form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              {/* Phone Number */}
              <div className="mb-3 form-floating">
                <input
                  type="tel"
                  className="form-control"
                  id="floatingPhone"
                  placeholder="Phone number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="floatingPhone">Phone number</label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-dark w-100 py-2 mb-3"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <hr className="my-3" />

            <div className="text-center">
              Already have an account?{" "}
              <Link to="/signin" className="text-decoration-none fw-semibold">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;