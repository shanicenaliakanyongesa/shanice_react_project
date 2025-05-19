import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://sokotrial.pythonanywhere.com/api/admin/orders ");
        setOrders(response.data);
      } catch (err) {
        console.error("Failed to load orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Manage Orders</h2>

      {/* Loading State */}
      {loading && (
        <div className="text-center p-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {/* Orders Table */}
      {!loading && orders.length === 0 ? (
        <div className="alert alert-info">No orders found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id || `#${index + 1}`}</td>
                  <td>
                    <strong>{order.username}</strong>
                    <br />
                    <small className="text-muted">{order.email}</small>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={`https://sokotrial.pythonanywhere.com/static/images/ ${order.product_photo}`}
                        alt={order.product_name}
                        style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
                        className="me-2"
                      />
                      {order.product_name}
                    </div>
                  </td>
                  <td>{order.quantity}</td>
                  <td>KES {order.total_amount}</td>
                  <td>
                    <span
                      className={`badge ${
                        order.status === "Processing"
                          ? "bg-warning"
                          : order.status === "Shipped"
                          ? "bg-info"
                          : order.status === "Delivered"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-dark me-2">
                      View
                    </button>
                    <button className="btn btn-sm btn-dark">
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;