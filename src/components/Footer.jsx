import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-4">

          {/* About Us */}
          <div className="col-md-3">
            <h5 className="text-danger fw-bold mb-3">Gym Extreme Essentials</h5>
            <p className="small text-muted">
              Your one-stop shop for premium fitness gear, supplements, and apparel to power your workouts and lifestyle.
            </p>

            {/* Social Media Icons */}
            <div className="d-flex gap-3 mt-3">
              <Link to="#" className="text-white fs-5" aria-label="Facebook">
                <i className="fab fa-facebook-square"></i>
              </Link>
              <Link to="#" className="text-white fs-5" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="#" className="text-white fs-5" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="text-white fs-5" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/" className="text-white text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="text-white text-decoration-none">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/aboutus" className="text-white text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-white text-decoration-none">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-white text-decoration-none">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="col-md-2">
            <h5 className="mb-3">Categories</h5>
            <ul className="list-unstyled small">
              <li className="mb-2">
                <Link to="/category/supplements" className="text-white text-decoration-none">
                  Supplements
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/apparel" className="text-white text-decoration-none">
                  Apparel
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/equipment" className="text-white text-decoration-none">
                  Equipment
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/accessories" className="text-white text-decoration-none">
                  Accessories
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/proteins" className="text-white text-decoration-none">
                  Protein Powders
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="col-md-3">
            <h5 className="mb-3">Stay Connected</h5>
            <p className="small text-muted">Subscribe to our newsletter for updates and offers.</p>
            <form className="d-flex mb-3">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Enter email"
                required
              />
              <button className="btn btn-danger btn-sm ms-1" type="submit">
                Go
              </button>
            </form>

            <h6 className="small text-muted mt-3">Follow us for tips & offers:</h6>
            <p className="small text-muted">
              Have questions? Reach out at{" "}
              <a href="mailto:support@gymextreme.com" className="text-white text-decoration-none">
                support@gymextreme.com
              </a>
            </p>
          </div>

          {/* Tips & Trust Badges */}
          <div className="col-md-2">
            <h5 className="mb-3">Tip of the Week</h5>
            <p className="small text-muted fst-italic">
              "Stay consistent — progress is made in the moments you don't skip your workout."
            </p>

            <h6 className="small mb-2">We Accept:</h6>
            <div className="d-flex gap-2">
              <img src="/images/visa.png" alt="Visa" width="30" />
              <img src="/images/mastercard.png" alt="MasterCard" width="30" />
              <img src="/images/paypal.png" alt="PayPal" width="30" />
              <img src="/images/stripe.png" alt="Stripe" width="30" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <p className="mb-0 small text-muted">
            &copy; {new Date().getFullYear()} Gym Extreme Essentials. All rights reserved. | Designed for champions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;