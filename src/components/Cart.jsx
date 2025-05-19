import { useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Remove item by product_id
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.product_id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Increase quantity
  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease quantity
  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.product_id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove if quantity is zero
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Total price calculation
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product_cost * item.quantity,
    0
  );

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => (
              <div key={item.product_id} className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-3">
                    <img
                      src={`https://sokotrial.pythonanywhere.com/static/images/${item.product_photo}`}
                      alt={item.product_name}
                      className="img-fluid rounded-start"
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{item.product_name}</h5>
                      <p className="card-text text-muted">
                        {item.product_description}
                      </p>
                      <h6>${item.product_cost}</h6>
                      <div className="d-flex align-items-center mt-2">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => decreaseQuantity(item.product_id)}
                        >
                          −
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => increaseQuantity(item.product_id)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-danger btn-sm ms-auto"
                          onClick={() => removeFromCart(item.product_id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card bg-light">
              <div className="card-body">
                <h5>Order Summary</h5>
                <hr />
                <p>
                  Total: <strong>${totalPrice.toFixed(2)}</strong>
                </p>
                <Link
                  to="/makepayment"
                  state={{ cart: cart }} // pass full cart instead of single product
                  className="btn btn-dark w-100"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
