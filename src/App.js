import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import CustomCarousel from "./components/Carousel";
import Getproducts from "./components/Getproducts";
import Addproduct from "./components/Addproduct";
import Footer from "./components/Footer";
import AboutUs from "./components/Aboutus";
import Cart from "./components/Cart";
import Makepayment from "./components/MakePayment";
import Profile from "./components/Profile";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import AdminDashboard from "./components/AdminDashbord";
import AdminSignin from "./components/AdminSignin";
import AdminLayout from "./components/AdminLayout";
import AdminProducts from "./components/AdminProducts"; // You'll create this next
import AdminOrders from "./components/AdminOrders"; // Optional
import AdminUsers from "./components/AdminUsers";
import EditProduct from "./components/EditProduct";
import EditUser from "./components/EditUser";
import AdminSidebar from "./components/AdminSidebar";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Getproducts />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/makepayment" element={<Makepayment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/signin" element={<AdminSignin />} />
          <Route path="/admin" element={
        <AdminProtectedRoute>
          <AdminLayout />
        </AdminProtectedRoute>
      }/>

          {/* Admin Routes (Protected) */}
          
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
  path="/admin/products/edit/:product_id"
  element={
    <AdminProtectedRoute>
      <EditProduct/>
    </AdminProtectedRoute>
  }
/>
<Route path="/admin/users/edit/:user_id" element={<EditUser />} />
 


<Route
  path="/admin/orders"
  element={
    <AdminProtectedRoute>
      <AdminOrders />
    </AdminProtectedRoute>
  }
/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
