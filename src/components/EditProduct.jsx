import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form fields
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [photo, setPhoto] = useState(null);

  // Image preview
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://sokotrial.pythonanywhere.com/api/products/${product_id}`);
        const data = response.data;
        setName(data.product_name);
        setDescription(data.product_description);
        setCost(data.product_cost);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [product_id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
  
    const formData = new FormData();
    formData.append("product_name", name);
    formData.append("product_description", description);
    formData.append("product_cost", cost);
    if (photo) {
      formData.append("product_photo", photo);
    }
  
    try {
      await axios.post(
        `https://sokotrial.pythonanywhere.com/api/admin/products/edit/${parseInt(product_id)}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
  
      setSuccess("Product updated successfully!");
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      setError("Failed to update product. Please try again.");
      console.error("Update Error:", err);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Fetching product details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger text-center">{error}</div>;
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 p-4">
            <h3 className="text-center mb-4">Edit Product</h3>

            {success && (
              <div className="alert alert-success text-center">{success}</div>
            )}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>

              {/* Cost */}
              <div className="mb-3">
                <label htmlFor="cost" className="form-label">
                  Cost (KES)
                </label>
                <input
                  type="number"
                  id="cost"
                  className="form-control"
                  min="0"
                  step="0.01"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                  Product Image (Optional)
                </label>
                <input
                  type="file"
                  id="photo"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {/* Preview */}
              {preview && (
                <div className="mb-3 text-center">
                  <img
                    src={preview}
                    alt="Image Preview"
                    className="img-thumbnail"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="btn btn-dark w-100 mt-3">
                Update Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;