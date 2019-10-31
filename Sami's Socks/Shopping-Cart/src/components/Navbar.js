import React from "react";
import { Link } from "react-router-dom";
import Auth from "./Auth"

var auth = Auth.getAuth();
var logXstring = auth ? "Logout" : "Login";

const handleLogX = () => {
  if (auth) {
    Auth.signout();
  }
}

const Navbar = () => {

  return (
    <nav className="nav-wrapper">
      <div className="container">
        <Link to="/" className="brand-logo">
          Sami's Socks
        </Link>

        <ul className="right">
        <li>
            <Link to="/quotes">Inspiration</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/">Shop</Link>
          </li>
          <li>
            <Link to="/cart">My cart</Link>
          </li>
          <li>
            <Link to="/checkout">
              <i className="material-icons">shopping_cart</i>
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={handleLogX}>{logXstring}</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
