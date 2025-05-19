import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AddEditProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const { product_id } = useParams();
  const navigate = useNavigate();

  const isEdit = Boolean(product_id); // If product_id exists, it's an edit

  // Fetch product data if editing
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`https://manuel254.pythonanywhere.com/api/products/ ${product_id}`)
        .then((res) => {
          const prod = res.data;
          setName(prod.product_name);
          setDescription(prod.product_description);
          setCost(prod.product_cost);
        });
    }
  }, [product_id, isEdit]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("product_name", name);
    data.append("product_description", description);
    data.append("product_cost", cost);
    if (photo) data.append("product_photo", photo);

    try {
      if (isEdit) {
        await axios.post(
          `https://sokotrial.pythonanywhere.com/api/admin/products/edit/ ${product_id}`,
          data
        );
      } else {
        await axios.post(
          "https://sokotrial.pythonanywhere.com/api/admin/products/add ",
          data
        );
      }

      setLoading(false);
      alert(isEdit ? "Product Updated" : "New Product Added");
      navigate("/admin/products");
    } catch (err) {
      setLoading(false);
      alert("An error occurred");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">{isEdit ? "Edit Product" : "Add New Product"}</h2>

      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Product Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Product Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Product Cost</label>
          <input
            type="number"
            className="form-control"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>{isEdit ? "Change Image (Optional)" : "Upload Image"}</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            required={!isEdit}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          {loading ? "Please wait..." : isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddEditProduct;