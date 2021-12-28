import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Redux/userRedux";
const Header = () => {
  const { displayName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    window.location.reload();
  };
  return (
    // Navigaion Bar
    <div className="sticky-top">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img
              src="https://727512.smushcdn.com/1881491/wp-content/themes/healthcoach/images/logo.png?lossy=1&strip=1&webp=1"
              alt=""
            />
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav d-flex align-items-center  ms-auto  mb-2 mb-lg-0">
              {/* Menu Part */}
              <li className="nav-item">
                <Link className="nav-link text-white" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                {displayName ? (
                  <Link className="nav-link text-white" to="/dashboard">
                    Dashboard
                  </Link>
                ) : (
                  " "
                )}
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/blog">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/package">
                  Plan
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/services">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">
                  About
                </Link>
              </li>
              <li>
                {displayName ? (
                  <button className="px-5 fs-5 py-1">
                    <Link onClick={handleLogOut} to="/">
                      LogOut
                    </Link>
                    <li>{displayName}</li>
                  </button>
                ) : (
                  <Link to="/login">
                    {" "}
                    <button className="px-5 fs-5 py-1 lowercase">Login</button>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
