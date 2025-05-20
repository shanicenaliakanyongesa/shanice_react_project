import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const img_url = "https://sokotrial.pythonanywhere.com/static/images/";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Remove extra spaces in URL
      const response = await axios.get(
        "https://sokotrial.pythonanywhere.com/api/get_product_details "
      );
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `https://sokotrial.pythonanywhere.com/api/admin/products/delete/${id}`
        );
        fetchProducts(); // Refresh list
      } catch (err) {
        alert("Failed to delete product.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center my-4">
        {error}
        <button className="btn btn-secondary mt-2" onClick={fetchProducts}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Manage Products</h2>
        <Link to="/addproduct" className="btn btn-success">
          Add New Product
        </Link>
      </div>

      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.product_name}</td>
                <td>{product.product_description.slice(0, 50)}...</td>
                <td>KES {product.product_cost}</td>
                <td>
                  <img
                    src={`${img_url}${product.product_photo}`}
                    alt={product.product_name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-outline-dark btn-sm me-2"
                    onClick={() =>
                      navigate(`/admin/products/edit/${product.product_id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;