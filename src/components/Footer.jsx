import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-bg text-white pt-5 pb-4">
      <div className="container">
        <div className="row g-4">

          {/* Column 1: About Us */}
          <div className="col-md-4">
            <h5 className="footer-heading mb-3">Gym Extreme Essentials</h5>
            <p className="small text-light">
              Your one-stop shop for premium fitness gear, supplements, and apparel to power your workouts.
            </p>

            {/* Social Media Icons */}
            <div className="d-flex gap-3 mt-3 mx-4">
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

          {/* Column 2: Quick Links */}
          <div className="col-md-4">
            <h5 className="footer-heading mb-3">Quick Links</h5>
            <ul className="list-unstyled small mb-4 footer-list">
              <li className="mb-2">
                <Link to="/" className="footer-link text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/products" className="footer-link text-decoration-none">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/aboutus" className="footer-link text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="footer-link text-decoration-none">
                  Contact
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="footer-link text-decoration-none">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter / Contact */}
          <div className="col-md-4">
            <h5 className="footer-heading mb-3">Stay Connected</h5>
            <p className="small text-light">Subscribe to our newsletter for updates and offers.</p>
            <form className="d-flex mb-3 footer-input-group">
              <input
                type="email"
                className="form-control form-control-sm bg-dark text-white"
                placeholder="Enter email"
                required
              />
              <button className="btn btn-danger btn-sm ms-1" type="submit">
                Go
              </button>
            </form>

            <h6 className="small text-light mt-3">Follow us for tips & offers:</h6>
            <p className="small text-light">
              Have questions? Reach out at{" "}
              <a href="mailto:support@gymextreme.com" className="footer-link text-decoration-none">
                support@gymextreme.com
              </a>
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="text-center mt-4 pt-3 footer-bottom">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Gym Extreme Essentials. All rights reserved. | Designed for champions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;