import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const doLogout = async () => {
    await logout()
      .then(history.push("/login"))
      .catch((err) => {
        if (err) {
          toast.error("Faild to logout");
        }
      });
  };
  return (
    <nav className="sticky-top navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="mx-4 navbar-brand" to="/">
        React Firebase Auth
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto me-4">
          {!currentUser && (
            <>
              <li className="nav-item ">
                <Link to="/login" className="nav-link">
                  Log In
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/signup" className="nav-link">
                  Signup
                </Link>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li className="nav-item dropdown">
                <a
                  href="#!"
                  className="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  data-toggle="dropdown"
                >
                  <img
                    src="/images/admin.jpg"
                    alt="admin"
                    height="30"
                    className="rounded-circle"
                  />
                  <span className="ml-2 navbar-text">{currentUser.email}</span>
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link to="/changepassword" className="dropdown-item">
                    Change Password
                  </Link>
                  <a href="#!" onClick={doLogout} className="dropdown-item">
                    Logout
                  </a>
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
