import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AddProduct = () => {
  // Form fields
  const [product_name, setName] = useState("");
  const [product_description, setDescription] = useState("");
  const [product_cost, setCost] = useState("");
  const [product_photo, setPhoto] = useState(null);

  // Feedback states
  const [loading, setLoading] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Preview state
  const [photoPreview, setPhotoPreview] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading("Please wait as we upload your product...");

    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_description", product_description);
      formData.append("product_cost", product_cost);
      if (product_photo) {
        formData.append("product_photo", product_photo);
      }

      const response = await axios.post(
        "https://sokotrial.pythonanywhere.com//api/admin/products/add",
        formData
      );

      setLoading("");
      setSuccess(response.data.message);
      setError("");

      // Reset form
      setName("");
      setDescription("");
      setCost("");
      setPhoto(null);
      setPhotoPreview("");
    } catch (err) {
      setLoading("");
      setError("An error occurred while adding the product.");
      setSuccess("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card border-0 shadow-sm p-4 rounded-3 bg-light">
            <Link to="/" className="btn btn-outline-secondary mb-3 w-auto align-self-start">
              ← Back to Products
            </Link>
            <h2 className="text-center fw-bold mb-4">Add New Product</h2>

            {/* Messages */}
            {loading && <div className="alert alert-info text-center">{loading}</div>}
            {success && <div className="alert alert-success text-center">{success}</div>}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            <form onSubmit={submit}>
              {/* Product Name */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Product Name"
                  value={product_name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label>Product Name</label>
              </div>

              {/* Description */}
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Product Description"
                  value={product_description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ height: "100px" }}
                  required
                ></textarea>
                <label>Product Description</label>
              </div>

              {/* Cost */}
              <div className="form-floating mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Product Cost"
                  value={product_cost}
                  onChange={(e) => setCost(e.target.value)}
                  min="0"
                  step="0.01"
                  required
                />
                <label>Product Cost</label>
              </div>

              {/* Image Upload */}
              <label className="form-label">Upload Product Image</label>
              <div className="input-group mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                  required={!photoPreview}
                />
              </div>

              {/* Image Preview */}
              {photoPreview && (
                <div className="text-center mb-3">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxHeight: "200px", objectFit: "contain" }}
                  />
                </div>
              )}

              {/* Submit Button */}
              <button type="submit" className="btn btn-dark w-100 mt-3 py-2">
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;