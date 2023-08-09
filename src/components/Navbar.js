// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../images/company-logo.png';
import '../styles/Navbar.css';

const Navbar = ({ loggedInUser }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={companyLogo} alt="Company Logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/upload">
                Upload
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/candidates">
              Candidates
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/test">
              Test
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/instructions">
              Instructions
              </Link>
            </li>
            {loggedInUser ? (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <i className="fas fa-user"></i> {loggedInUser.name}
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <a href="/login">Login</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
