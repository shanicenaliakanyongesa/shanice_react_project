import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loading,setLoading]=useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
  
    try {
      const response = await axios.post(
        "https://sokotrial.pythonanywhere.com/api/admin/signin",
        data
      );
  
      console.log("Backend Response:", response.data); // 🔍 Debugging
  
      if (response.data.message === "Login successful") {
        localStorage.setItem("admin", JSON.stringify(response.data.user));
        navigate("/admin/dashboard");
      } else {
        setError("Invalid admin credentials");
        setLoading(false);
      }
  
    } catch (err) {
      console.error("Login Error:", err); // 🔍 Debugging
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 p-4 text-center">
            <h3>Admin Sign In</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={submit}>
              <input
                type="email"
                placeholder="Email"
                className="form-control mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-dark w-100">
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSignin;