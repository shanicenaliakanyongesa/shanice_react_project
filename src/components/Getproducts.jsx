// import axios from "axios";
// import { useEffect, useState } from "react";
// import "../App.css";
// import { useNavigate } from "react-router-dom";
// import CustomCarousel from "./Carousel";

// const Getproducts = () => {
//   const [loading, setLoading] = useState("Please wait while we load products...");
//   const [error, setError] = useState("");
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   // Cart state
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Toast notification
//   const [showToast, setShowToast] = useState(false);
//   const [toastMessage, setToastMessage] = useState("");

//   const navigate = useNavigate();

//   // Fetch products
//   const get_products = async () => {
//     setLoading("Loading products...");
//     try {
//       const response = await axios.get(
//         "https://sokotrial.pythonanywhere.com/api/get_product_details "
//       );
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//       setLoading("");
//     } catch (err) {
//       setError("Failed to load products.");
//       setLoading("");
//     }
//   };

//   useEffect(() => {
//     get_products();
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // Filter products based on search & price
//   useEffect(() => {
//     if (!Array.isArray(products)) return;

//     let result = [...products];

//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.product_name.toLowerCase().includes(query) ||
//           p.product_description.toLowerCase().includes(query)
//       );
//     }

//     if (minPrice !== "") result = result.filter((p) => p.product_cost >= parseFloat(minPrice));
//     if (maxPrice !== "") result = result.filter((p) => p.product_cost <= parseFloat(maxPrice));

//     setFilteredProducts(result);
//     setCurrentPage(1);
//   }, [products, searchQuery, minPrice, maxPrice]);

//   const indexOfLast = currentPage * productsPerPage;
//   const indexOfFirst = indexOfLast - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   // Add to Cart Function
//   const addToCart = (product) => {
//     const existingProductIndex = cart.findIndex(
//       (item) => item.product_id === product.product_id
//     );

//     if (existingProductIndex >= 0) {
//       const updatedCart = [...cart];
//       updatedCart[existingProductIndex].quantity += 1;
//       setCart(updatedCart);
//     } else {
//       setCart([...cart, { ...product, quantity: 1 }]);
//     }

//     setToastMessage(`${product.product_name} added to cart`);
//     setShowToast(true);

//     setTimeout(() => {
//       setShowToast(false);
//     }, 2000);
//   };

//   const img_url = "https://sokotrial.pythonanywhere.com/static/images/";

//   return (
//     <div className="container-fluid py-4 bg-light">
//       {/* Toast Notification */}
//       {showToast && (
//         <div
//           className="position-fixed top-0 end-0 m-3 alert alert-success fade show"
//           style={{ zIndex: "1050" }}
//           role="alert"
//         >
//           {toastMessage}
//         </div>
//       )}

//       {/* Carousel */}
//       <CustomCarousel />

//       {/* Header */}
//       <div className="text-center my-4">
//         <h2 className="fw-bold">Explore Our Products</h2>
//         <p className="text-muted">Find what you need at the best prices.</p>
//       </div>

//       {/* Search & Filters */}
//       <div className="row mb-4 g-3 justify-content-center">
//         <div className="col-md-6 col-lg-5">
//           <div className="input-group input-group-lg">
//             <span className="input-group-text bg-white border-end-0">
//               <i className="fas fa-search text-muted"></i>
//             </span>
//             <input
//               type="text"
//               className="form-control form-control-lg border-start-0"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="col-md-3 col-lg-2">
//           <input
//             type="number"
//             className="form-control form-control-lg"
//             placeholder="Min $"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//           />
//         </div>

//         <div className="col-md-3 col-lg-2">
//           <input
//             type="number"
//             className="form-control form-control-lg"
//             placeholder="Max $"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Loading / Error / Empty States */}
//       {loading && (
//         <div className="text-center text-muted py-5">
//           <div className="spinner-border text-secondary mb-2" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//           <p>{loading}</p>
//         </div>
//       )}

//       {error && <div className="alert alert-danger text-center">{error}</div>}
//       {!loading && !error && filteredProducts.length === 0 && (
//         <div className="text-center py-5">
//           <h5>No products match your criteria.</h5>
//           <button
//             className="btn btn-outline-dark mt-2"
//             onClick={() => {
//               setSearchQuery("");
//               setMinPrice("");
//               setMaxPrice("");
//             }}
//           >
//             Clear Filters
//           </button>
//         </div>
//       )}

//       {/* Product Grid */}
//       <div className="row g-4">
//         {currentProducts.map((product, index) => (
//           <div key={index} className="col-sm-6 col-md-4 col-lg-3">
//             <div className="cardd h-100 shadow-sm border-0 hover-lift">
//               <img
//                 src={img_url + product.product_photo}
//                 alt={product.product_name}
//                 className="card-img-top product-img"
//                 style={{ height: "200px", objectFit: "cover" }}
//               />
//               <div className="card-body d-flex flex-column">
//                 <h5 className="card-title text-dark fw-semibold">{product.product_name}</h5>
//                 <p className="card-text text-muted small flex-grow-1">
//                   {product.product_description.slice(0, 70)}...
//                 </p>
//                 <div className="mt-auto">
//                   <h6 className="text-warning fs-5">KES {product.product_cost}</h6>
//                   <button
//                     className="btn btn-dark w-100 mt-2 py-2"
//                     onClick={() =>
//                       navigate("/makepayment", { state: { cart: [{ ...product, quantity: 1 }] } })
//                     }
//                   >
//                     Buy Now
//                   </button>
//                   <button
//                     className="btn btn-outline-dark w-100 mt-2 py-2"
//                     onClick={() => addToCart(product)}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {filteredProducts.length > productsPerPage && (
//         <nav aria-label="Page navigation" className="mt-5 d-flex justify-content-center">
//           <ul className="pagination">
//             <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//               <button className="page-link" onClick={handlePrevPage}>
//                 Previous
//               </button>
//             </li>
//             {[...Array(totalPages).keys()].map((num) => (
//               <li key={num + 1} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
//                 <button className="page-link" onClick={() => setCurrentPage(num + 1)}>
//                   {num + 1}
//                 </button>
//               </li>
//             ))}
//             <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//               <button className="page-link" onClick={handleNextPage}>
//                 Next
//               </button>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </div>
//   );
// };

// export default Getproducts;
import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import CustomCarousel from "./Carousel";

const Getproducts = () => {
  const [loading, setLoading] = useState("Please wait while we load products...");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Cart state
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showCartModal, setShowCartModal] = useState(false);

  // Toast notification
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const navigate = useNavigate();

  const img_url = "https://sokotrial.pythonanywhere.com/static/images/";

  // Fetch products
  const get_products = async () => {
    setLoading("Loading products...");
    try {
      const response = await axios.get(
        "https://sokotrial.pythonanywhere.com/api/get_product_details"
      );
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading("");
    } catch (err) {
      setError("Failed to load products.");
      setLoading("");
    }
  };

  useEffect(() => {
    get_products();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Filter products based on search & price
  useEffect(() => {
    if (!Array.isArray(products)) return;

    let result = [...products];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.product_name.toLowerCase().includes(query) ||
          p.product_description.toLowerCase().includes(query)
      );
    }

    if (minPrice !== "") result = result.filter((p) => p.product_cost >= parseFloat(minPrice));
    if (maxPrice !== "") result = result.filter((p) => p.product_cost <= parseFloat(maxPrice));

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [products, searchQuery, minPrice, maxPrice]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Add to Cart Function (with correct immutable update)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.product_id === product.product_id
      );

      let updatedCart;
      if (existingProductIndex >= 0) {
        updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart = [...prevCart, { ...product, quantity: 1 }];
      }

      setToastMessage(`${product.product_name} added to cart`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);

      return updatedCart;
    });
  };

  // Remove item from cart
  const removeCartItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product_id !== productId));
  };

  // Cart Modal Component
  const CartModal = ({ cart, onClose }) => {
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.product_cost * item.quantity,
      0
    );

    return (
      <div className="cart-modal-overlay" onClick={onClose}>
        <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
          <h5 className="mb-3">Your Cart</h5>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul className="list-unstyled">
                {cart.map((item, index) => (
                  <li key={index} className="d-flex align-items-start mb-3 border-bottom pb-2">
                    {/* Product Image */}
                    <img
                      src={`${img_url}${item.product_photo}`}
                      alt={item.product_name}
                      style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "4px" }}
                      className="me-3"
                    />
                    <div className="flex-grow-1">
                      <strong>{item.product_name}</strong>
                      <br />
                      <small>Qty: {item.quantity}</small>
                    </div>
                    <div className="text-end">
                      <strong>KES {(item.product_cost * item.quantity).toFixed(2)}</strong>
                      <br />
                      <button
                        className="btn btn-sm btn-outline-danger mt-1"
                        onClick={() => removeCartItem(item.product_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>KES {totalPrice.toFixed(2)}</span>
              </div>
              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-dark w-100"
                  onClick={() => {
                    navigate("/makepayment", { state: { cart } });
                    onClose();
                  }}
                >
                  Checkout
                </button>
                <button className="btn btn-outline-dark w-100" onClick={onClose}>
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid py-4 bg-light">
      {/* Toast Notification */}
      {showToast && (
        <div
          className="position-fixed top-0 end-0 m-3 alert alert-success fade show"
          style={{ zIndex: "1050" }}
          role="alert"
        >
          {toastMessage}
        </div>
      )}

      {/* Carousel */}
      <CustomCarousel />

      {/* Cart Icon */}
      <div className="position-fixed bottom-0 end-0 m-4 z-3">
        <button
          className="btn btn-light rounded-circle position-relative shadow"
          style={{ width: "50px", height: "50px" }}
          onClick={() => setShowCartModal(true)}
          aria-label="View Cart"
        >
          <i className="fas fa-shopping-cart text-dark fs-5"></i>
          {cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Cart Modal */}
      {showCartModal && (
        <CartModal
          cart={cart}
          onClose={() => setShowCartModal(false)}
        />
      )}

      {/* Header */}
      <div className="text-center my-4">
        <h2 className="fw-bold">Explore Our Products</h2>
        <p className="text-muted">Find what you need at the best prices.</p>
      </div>

      {/* Search & Filters */}
      <div className="row mb-4 g-3 justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="input-group input-group-lg">
            <span className="input-group-text bg-white border-end-0">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control form-control-lg border-start-0"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-3 col-lg-2">
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="Min $"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="col-md-3 col-lg-2">
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="Max $"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Loading / Error / Empty States */}
      {loading && (
        <div className="text-center text-muted py-5">
          <div className="spinner-border text-secondary mb-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>{loading}</p>
        </div>
      )}

      {error && <div className="alert alert-danger text-center">{error}</div>}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center py-5">
          <h5>No products match your criteria.</h5>
          <button
            className="btn btn-outline-dark mt-2"
            onClick={() => {
              setSearchQuery("");
              setMinPrice("");
              setMaxPrice("");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Product Grid */}
      <div className="row g-4">
        {currentProducts.map((product, index) => (
          <div key={index} className="col-sm-6 col-md-4 col-lg-3">
            <div className="cardd h-100 shadow-sm border-0 hover-lift">
              <img
                src={img_url + product.product_photo}
                alt={product.product_name}
                className="card-img-top product-img"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-dark fw-semibold">{product.product_name}</h5>
                <p className="card-text text-muted small flex-grow-1">
                  {product.product_description.slice(0, 70)}...
                </p>
                <div className="mt-auto">
                  <h6 className="text-warning fs-5">KES {product.product_cost}</h6>
                  <button
                    className="btn btn-dark w-100 mt-2 py-2"
                    onClick={() =>
                      navigate("/makepayment", { state: { cart: [{ ...product, quantity: 1 }] } })
                    }
                  >
                    Buy Now
                  </button>
                  <button
                    className="btn btn-outline-dark w-100 mt-2 py-2"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {filteredProducts.length > productsPerPage && (
        <nav aria-label="Page navigation" className="mt-5 d-flex justify-content-center">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={handlePrevPage}>
                Previous
              </button>
            </li>
            {[...Array(totalPages).keys()].map((num) => (
              <li key={num + 1} className={`page-item ${currentPage === num + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(num + 1)}>
                  {num + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={handleNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Getproducts;