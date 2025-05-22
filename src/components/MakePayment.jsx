import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const Makepayment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get cart from navigation state
  const cart = location.state?.cart;

  // Local state
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Calculate total amount
  const totalAmount = cart
    ? cart.reduce((sum, item) => sum + item.product_cost * item.quantity, 0)
    : 0;

  if (!cart || cart.length === 0) {
    return (
      <div className="container text-center mt-5">
        <div className="card mx-auto shadow-sm" style={{ maxWidth: "500px" }}>
          <div className="card-body p-5">
            <h2 className="text-danger mb-3">No Items in Cart</h2>
            <p className="text-muted">Please add some products before proceeding to payment.</p>
            <button className="btn btn-dark mt-3" onClick={() => navigate(-1)}>
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("phone", phone);
    data.append("amount", totalAmount);

    try {
      const response = await axios.post(
        "https://modcom2.pythonanywhere.com/api/mpesa_payment",
        data
      );

      setMessage("Please complete the payment on your phone.");
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const img_url = "https://sokotrial.pythonanywhere.com/static/images/";

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="fw-bold text-success">LIPA NA MPESA</h2>
            <p className="text-muted">Secure Payment via M-Pesa</p>
          </div>

          {/* Product List Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-header bg-white fw-bold">Your Cart</div>
            <ul className="list-group list-group-flush">
              {cart.map((item) => (
                <li key={item.product_id} className="list-group-item">
                  <div className="d-flex align-items-center">
                    <img
                      src={img_url + item.product_photo}
                      alt={item.product_name}
                      style={{ height: "70px", width: "70px", objectFit: "cover", borderRadius: "6px" }}
                    />
                    <div className="ms-3 flex-grow-1">
                      <h6 className="mb-1">{item.product_name}</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <div className="text-end">
                      <strong>KES {(item.product_cost * item.quantity).toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Total Summary */}
          <div className="card shadow-sm mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Total Amount</h5>
              <h5 className="text-success mb-0 fw-bold">KES {totalAmount.toFixed(2)}</h5>
            </div>
          </div>

          {/* Payment Form Card */}
          <div className="card shadow-sm">
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="mb-4">
                  <label htmlFor="phone" className="form-label fw-semibold">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control form-control-lg"
                    placeholder="Enter number 254712345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 btn-lg py-3"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    "Make Secure Payment"
                  )}
                </button>

                {/* Message */}
                {message && (
                  <div
                    className={`alert ${
                      message.includes("error") ? "alert-danger" : "alert-success"
                    } text-center mt-3`}
                  >
                    {message}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Makepayment;